var compressGeojson = require('../lib/compressGeojson');
var GJV = require('geojson-validation');

var testFeature1 = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "title": "Test title",
      "foo": "bar"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        0,
        0
      ]
    }
  }, {
    "type": "Feature",
    "properties": {
      "title": "Test title",
      "foo": "bar"
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [
          0.0006920099258422852,
          0.0008502602576928233
        ],
        [
          0.0004318356513977051,
          0.000348687171944809
        ]
      ]
    }
  }, {
    "type": "Feature",
    "properties": {
      "title": "Test title",
      "foo": "bar"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            0.000858306884765625,
            0.0002923607826294732
          ],
          [
            0.000858306884765625,
            0.0006088614463777332
          ],
          [
            0.0009468197822570801,
            0.0006088614463777332
          ],
          [
            0.0009468197822570801,
            0.0002923607826294732
          ],
          [
            0.000858306884765625,
            0.0002923607826294732
          ]
        ]
      ]
    }
  }]
};



var compressed = compressGeojson.compress(testFeature1);
var decompressed = compressGeojson.decompress(compressed);

var originalAsString = JSON.stringify(testFeature1);
var compressedlAsString = JSON.stringify(compressed);
var decompressedAsString = JSON.stringify(decompressed);

console.log('testFeature1');
console.log("Decompressed is valid geojson: " + GJV.valid(decompressed));
console.log("Original === Decompressed: ", originalAsString === decompressedAsString);

console.log("Original bytes: ", Buffer.byteLength(originalAsString, 'utf8'));
console.log("Compressed bytes: ", Buffer.byteLength(compressedlAsString, 'utf8'));
console.log("Decompressed bytes: ", Buffer.byteLength(decompressedAsString, 'utf8'));
