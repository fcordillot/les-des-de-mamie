// Dependencies
import Airtable from 'airtable'
import axios from 'axios'

export const fetchData = () => {
  const base = new Airtable({ apiKey: process.env.VUE_APP_AIRTABLE_API_KEY }).base('appDOutcV6BK0te87')
  const tabs = [
    'Personnes',
    'Pays',
    'Villes',
    'Dés'
  ]
  const content = {
    records: {}
  }
  let tabIndex = 0

  return new Promise(resolve => {
    for (const tab of tabs) {
      const page = base(tab).select()

      page.eachPage(async (records, fetchNextPage) => {
        content[tab] = {
          __map: []
        }

        // This function (`page`) will get called for each page of records.
        for (const record of records) {
          content[tab].__map.push(record)
          content.records[record.id] = record
          content[tab][record.id] = record
        }

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        await fetchNextPage()
      }, error => {
        if (error) {
          console.error(error)
        }
        tabIndex += 1

        if (tabIndex === tabs.length) {
          const thimbles = { ...content['Dés'] }
          content['Dés'] = {
            __map: []
          }
          let needToWaitUpdate = false
          let thimblesIndex = 0

          thimbles.__map.forEach(thimble => {
            thimblesIndex += 1
            const fields = thimble.fields

            // Offert by
            const offertBy = fields['Offert par']
            const _offertBy = []
            offertBy.forEach(o => {
              _offertBy.push(content.records[o])
            })
            thimble.fields['Offert par'] = _offertBy

            // Country
            const country = fields['Pays']
            const _country = []
            country.forEach(o => {
              _country.push(content.records[o])
            })
            thimble.fields['Pays'] = _country

            // City
            const city = fields['Ville']
            const _city = []
            city.forEach(o => {
              _city.push(content.records[o])
            })
            thimble.fields['Ville'] = _city

            if (!fields.hasOwnProperty('Latitude') || fields.Latitude.trim() === '' || !fields.hasOwnProperty('Longitude') || fields.Longitude.trim() === '') {
              needToWaitUpdate = true
              const city = thimble.fields['Ville'][0].fields.Nom
              const country = thimble.fields['Pays'][0].fields.Nom

              axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=${process.env.VUE_APP_OPENCAGEDATA_TOKEN}`)
                .then(response => {
                  // handle success
                  if (response && response.data && response.data.results && response.data.results.length >= 1 && response.data.results[0].geometry) {
                    const Latitude = response.data.results[0].geometry.lat
                    const Longitude = response.data.results[0].geometry.lng

                    base('Dés').update([{
                      id: thimble.id,
                      fields: {
                        Latitude: String(Latitude),
                        Longitude: String(Longitude)
                      }
                    }], (err, records) => {
                      if (err) {
                        console.error(err)
                      }

                      records.forEach(record => {
                        content['Dés'][record.id] = record
                        const __mapIndex = content['Dés'].__map.findIndex(r => r.id === record.id)
                        content['Dés'].__map[__mapIndex] = record
                        console.log(`${record.get('ID')} updated`)
                      })

                      if (thimblesIndex === thimbles.__map.length) {
                        resolve(content)
                      }
                    })
                  }
                })
                .catch(error => {
                  // handle error
                  console.log(error)
                })
            }

            content['Dés'].__map.push(thimble)
            content['Dés'][thimble.id] = thimble
          })

          if (!needToWaitUpdate) {
            resolve(content)
          }
        }
      })
    }
  })
}
