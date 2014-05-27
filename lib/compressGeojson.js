var GJV = require('geojson-validation');
var clone = require('clone');

var exchangeKeys = {
  'type': 't',
  'geometry': 'g',
  'properties': 'p',
  'coordinates': 'c',
  'features': 'f'
};

var exchangeTypes = {
  'Point': 'M',
  'LineString': 'L',
  'Polygon': 'P',
  'FeatureCollection': 'FC',
  'Feature': 'F'
};

var exchangeKeysReverse = {
  't': 'type',
  'g': 'geometry',
  'p': 'properties',
  'c': 'coordinates',
  'f': 'features'
};

var exchangeTypesReverse = {
  'M': 'Point',
  'L': 'LineString',
  'P': 'Polygon',
  'FC': 'FeatureCollection',
  'F': 'Feature'
};

module.exports.compress = function(geojson) {
  if (GJV.valid(geojson)) {
    return startCompression(clone(geojson));
  } else {
    console.error('No valid geojson');
    return false;
  }
};

module.exports.decompress = function(geojson) {
  if (typeof geojson === 'object') {
    return startDecompression(clone(geojson));
  } else {
    console.error('Input is no object');
    return false;
  }
};


function startCompression(geojson) {
  for (var key in geojson) {
    if (geojson.hasOwnProperty(key)) {
      if (key === 'type') {
        if (exchangeTypes[geojson[key]]) {
          geojson[key] = exchangeTypes[geojson[key]];
        }
      }
      if (exchangeKeys[key]) {
        var newKey = exchangeKeys[key];
        geojson.renameProperty(key, newKey);
        if (Array.isArray(geojson[newKey])) {
          for (var i = 0; i < geojson[newKey].length; i++) {
            geojson[newKey][i] = startCompression(geojson[newKey][i]);
          }
        } else if (typeof geojson[newKey] === 'object') {
          geojson[newKey] = startCompression(geojson[newKey]);
        }
      }
    }
  }
  return geojson;
}


function startDecompression(geojson) {
  for (var key in geojson) {
    if (geojson.hasOwnProperty(key)) {
      if (key === 't') {
        if (exchangeTypesReverse[geojson[key]]) {
          geojson[key] = exchangeTypesReverse[geojson[key]];
        }
      }
      if (exchangeKeysReverse[key]) {
        var newKey = exchangeKeysReverse[key];
        geojson.renameProperty(key, newKey);
        if (Array.isArray(geojson[newKey])) {
          for (var i = 0; i < geojson[newKey].length; i++) {
            geojson[newKey][i] = startDecompression(geojson[newKey][i]);
          }
        } else if (typeof geojson[newKey] === 'object') {
          geojson[newKey] = startDecompression(geojson[newKey]);
        }
      }
    }
  }
  return geojson;
}



Object.prototype.renameProperty = function(oldName, newName) {
  // Check for the old property name to avoid a ReferenceError in strict mode.
  if (this.hasOwnProperty(oldName)) {
    this[newName] = this[oldName];
    delete this[oldName];
  }
  return this;
};
