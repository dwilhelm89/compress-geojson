compress-geojson
================

Abreviates GeoJSON keys like properties, geometry, coordinates to minimize the overhead.
Is really slow for large files due to the recursive function and fails if there are already properties like: 't','g','p',  'c','f'


Usage
=======

````
npm install compress-geojson
````
````
var compressGeojson = require('compress-geojson');

var compressed = compressGeojson.compress(geojsonFeature);
var decompressed = compressGeojson.decompress(compressed);
````

