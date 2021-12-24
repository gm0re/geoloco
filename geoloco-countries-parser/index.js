const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const getStream = () => {
    const jsonData = './countries.geojson';
    const stream = fs.createReadStream(jsonData, { encoding: 'utf8' });
    const parser = JSONStream.parse('*');

    return stream.pipe(parser);
};

getStream().pipe(es.mapSync((data) => {
  if (Array.isArray(data)) {
    data.forEach((country) => {
      const file = `./countries-output/${(country.properties.ADMIN).toLowerCase().replace(' ', '-')}.json`;

      console.log(`Writting ${file}`)

      // format coords
      const coordinates = country.geometry.coordinates
        .flat(1)
        .reduce((formattedCoords, oldCoords) => {
          const formatCoords = (coords) => {
            getPairCoords = ([lat, lng]) => ({ lat, lng })
            if (!Array.isArray(coords[0])) {
              return getPairCoords(coords)
            }
            return coords.map(getPairCoords)
          }

          return [
            ...formattedCoords,
            formatCoords(oldCoords)
          ]
        }
      , [])

      console.log('res', coordinates)

      // create country json file with formatted coords
      fs.writeFile(file, JSON.stringify(coordinates), err => {
        if (err) {
          console.error(err)
          return
        }
        console.log(`${file} created succesfully!`)
      })
    })
  }
})).on('error', function (err) {
    // handle any errors
    console.log('err', err)
});