'use strict';

(function(module) {
  var zip = {};
  var neighborhoodTotals = {};
  zip.topFive = [];

  var getData = function() {
    function justTheGoodProps(obj) {
      return {
        zipCode: obj.properties.zip,
        neighborhood: !!obj.properties.neighborhood ? obj.properties.neighborhood.split(',')[0] : null,
        address: !!obj.properties.address ? obj.properties.address : null,
        coordinates: {
          lat: obj.geometry.coordinates[1],
          lng: obj.geometry.coordinates[0]
        }
      };
    }

    $.getJSON('/data/manhattan.json', function(data) {
      data.features.map(justTheGoodProps)
      .forEach(buildZipsDictionary);
      generateTopFive(neighborhoodTotals);
    });
  };

  function buildZipsDictionary(zipObj) {
    var curNeighb = zipObj.neighborhood;
    neighborhoodTotals[curNeighb] ?
      neighborhoodTotals[curNeighb] ++ :
      neighborhoodTotals[curNeighb] = 1;
  }

  function generateTopFive(obj) {
    for(var neighborhood in obj) {
      zip.topFive.push({
        neighborhood: neighborhood,
        totalZips: obj[neighborhood]
      });
    }
    zip.topFive.sort(descending).splice(5);
  }

  var descending = function(curNeighb, nextNeighb) {
    return nextNeighb.totalZips - curNeighb.totalZips;
  };

  getData();
  module.zip = zip;
})(window);
