var icesat = ee.FeatureCollection("users/ucanwhatsappme/ICESat"),
    geometry = 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[76.4536005695561, 8.215053092798794],
          [78.1894404133061, 8.084548620325716],
          [79.1562372883061, 18.06573456882925],
          [77.3984247883061, 18.21189960169156]]]);

function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}

var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01', '2020-01-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);

var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};

Map.setCenter(73.277, 17.7009, 5);
var clip=dataset.mean().clip(geometry);
Map.addLayer(clip, visualization, 'RGB');
Map.addLayer(icesat);
