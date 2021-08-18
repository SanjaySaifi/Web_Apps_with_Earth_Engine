var region = ee.FeatureCollection("users/ucanwhatsappme/Patiala");
Map.setCenter(76.3869, 30.3398, 9);



// rgb true color image 

var data6 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
    .filterDate('2020-05-01', '2020-06-01');
    
var clip6 =data6.mean().clip(region);

var bands6 = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 30000.0,
};


Map.addLayer(clip6, bands6, 'True Color');




//landcover map
var dataset7 =
    ee.ImageCollection('Oxford/MAP/IGBP_Fractional_Landcover_5km_Annual')
        .filter(ee.Filter.date('2012-01-01', '2012-12-31'));
        
var landcover7 = dataset7.select('Overall_Class');
var clip7=landcover7.mean().clip(region);
var bands7 = {
  min: 1.0,
  max: 19.0,
  palette: [
    '032f7e', '02740b', '02740b', '8cf502', '8cf502', 'a4da01', 'ffbd05',
    'ffbd05', '7a5a02', 'f0ff0f', '869b36', '6091b4', '999999', 'ff4e4e',
    'ff4e4e', 'ffffff', 'feffc0', '020202', '020202'
  ],
};

Map.addLayer(clip7, bands7, 'Landcover');





// elevation


var data = ee.Image('CGIAR/SRTM90_V4');
var elevation = data.select('elevation');
var slope = ee.Terrain.slope(elevation);

var image=slope.clip(region);
var bands = {
  min: 0,
  max: 4,
 
};


Map.addLayer(image,bands,"ELEVATION");

//soil texture
var dataset2 = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02");

var bands2 = {
  bands: ['b0'],
  min: 1.0,
  max: 12.0,
  palette: [
    "d5c36b","b96947","9d3706","ae868f","f86714","46d143",
    "368f20","3e5a14","ffd557","fff72e","ff5a9d","ff005b",
  ]
};

var clip2=dataset2.clip(region);

Map.addLayer(clip2,bands2,"SOIL TYPE");

//cropland extent

var dataset = ee.Image('USGS/GFSAD1000_V1');
var cropMask = dataset.select('landcover');

var clip3=cropMask.clip(region);
var bands3 = {
  min: 0.0,
  max: 5.0,
  palette: ['black', 'orange', 'brown', '02a50f', 'green', 'yellow'],
};

Map.addLayer(clip3,bands3,'Cropland Extent');


// soil water capacity
var data4 = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01");
var clip4=data4.clip(region);
var bands4 = {
  bands: ['b0'],
  min: 0.0,
  max: 52.9740182135385,
  palette: [
    "d29642","eec764","b4ee87","32eeeb","0c78ee","2601b7",
    "083371",
  ]
};
Map.addLayer(clip4, bands4, ' Surface Water');


// hydrography

var data5 = ee.Image("MERIT/Hydro/v1_0_1");
var clip5=data5.clip(region);
var bands5 = {
  bands: ['viswth'],
};


Map.addLayer(clip5, bands5, 'hydrography');











