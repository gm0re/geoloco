const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const getStream = () => {
  const jsonData = './countries.geojson';
  const stream = fs.createReadStream(jsonData, { encoding: 'utf8' });
  const parser = JSONStream.parse('*');

  return stream.pipe(parser);
};

getStream().pipe(es.mapSync((geoData) => {
  if (Array.isArray(geoData)) {
    const coordsFormattReducer = (formattedCoords, oldCoords) => {
      const formatCoords = (coords) => {
        const getPairCoords = ([lng, lat]) => ({ lat, lng })

        if (!Array.isArray(coords[0])) {
          return getPairCoords(coords)
        }
        return coords.map(getPairCoords)
      }

      return [
        ...formattedCoords,
        formatCoords(oldCoords)
      ]
    };

    let countryList = [];

    geoData.forEach((country) => {
      const countryName = (country.properties.ADMIN).toLowerCase().replace(' ', '-');

      countryList = [
        ...countryList,
        countryName
      ];

      const file = `../public/countries/${countryName}.json`;

      console.log(`Writting ${file}`)

      // format coords
      const coordinates = country.geometry.coordinates
        .flat(1)
        .reduce(coordsFormattReducer, []);

      console.log('res', coordinates)

      // create country json file with formatted coords
      fs.writeFile(file, JSON.stringify(coordinates), (err) => {
        if (err) {
          console.error(err);
          return
        }
        console.log(`${file} created succesfully!`)
      })
    });

    fs.writeFile('../src/constants/countries/index.json', JSON.stringify(countryList, null, 2), (err) => {
      if (err) {
        console.error(err);
        return
      }
      console.log('country list created succesfully!')
    })
  }
})).on('error', (err) => {
  // handle any errors
  console.log('err', err)
});
