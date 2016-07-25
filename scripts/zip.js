(function(module) {
  var zip = {};

  zip.locations = [];

  zip.getData = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      zip.locations = data.features.map(function(allData) {
        var newObj = {
          zipcode: allData.properties.zip,
          neighborhood: allData.properties.neighborhood.split(',')[0],
          address: allData.properties.address,
          coordinates: {
            lat: allData.geometry.coordinates[1],
            lng: allData.geometry.coordinates[0]
          }
        };
        // console.log(newObj);
        return newObj;
      }).reduce(function(uniqueNeighborhoods, currentZip, index, array) {
        if(uniqueNeighborhoods.indexOf(currentZip.zipcode) === -1) {
          uniqueNeighborhoods.push(currentZip);
        }
        return uniqueNeighborhoods;
      }, []);
      console.log(zip.locations.length);
      return zip.locations;
    });
  };

  zip.getTopFive = function() {
    return zip.locations.map(function(obj, index, array) {
      return {
        place: array[index].neighborhood,
        total: zip.locations.filter(function(curLocation) {
          return curLocation.neighborhood === neighborhood;
        })
      };
    });
  };

  zip.getData();
  module.zip = zip;
})(window);
