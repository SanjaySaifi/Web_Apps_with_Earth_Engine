var data=ee.Image("ESA/GLOBCOVER_L4_200901_200912_V2_3").select('landcover').clip(mask);
var clip=data.clip(mask)     //ADD SHAPEFILE  LIKE THIS  ->   var mask = ee.FeatureCollection("users/ucanwhatsappme/India_Shapefile");
Map.setCenter(78,28,4).addLayer(clip);   //EXPLORE MORE ON YOUTUBE : https://youtu.be/oKdayLSFenM
