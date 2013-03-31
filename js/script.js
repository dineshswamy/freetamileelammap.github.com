var query;
google.load('visualization',1);
var map;
var last_infowindow;
var markersArray=new Array();
function initialize()
{
query="SELECT lat,lon,place,students_group_name FROM 1KONG4qpk8XFKw309lxjyVy-UB0tU9ldY2AxAoyE";
/* Styling google maps */
/*
var stylearray=[
{
featuretype:"landscape",
stylers: [
{ hue: "#FF8C00" },
{ saturation: 50 }
]
},
{
featuretype:"road.arterial",
elementType:"geometry",
stylers: [
{ hue: "#FF8C00" },
{ saturation: 80 }
]
}
];
*/
var mapOptions={
center:new google.maps.LatLng(13.1307263,79.7624177),
zoom:8,
mapTypeControl:false,
zoomControl:true,
mapTypeId:google.maps.MapTypeId.ROADMAP
};

map=new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
QueryFusionTable(query);
google.maps.event.addListener(map,'zoom_changed',function(){ 
//clearMarker();
//lon=map.getBounds().toString();
//alert(lon+"lon[2]"+parseFloat(lon[2]));
});

}


function QueryFusionTable(query)
{
query=encodeURIComponent(query);
var gvizquery=new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='+query);
console.log('http://www.google.com/fusiontables/gvizdata?tq='+query);
gvizquery.send(function(response){
var n=response.getDataTable().getNumberOfRows();
for(var i=0;i<n;i++)
{
var lat=response.getDataTable().getValue(i,0);
var lon=response.getDataTable().getValue(i,1);
var place=response.getDataTable().getValue(i,2);
var students_group_name=response.getDataTable().getValue(i,3);
//var date=response.getDataTable().getValue(i,4);
//var time=response.getDataTable().getValue(i,5);
//var photos_url=response.getDataTable().getValue(i,6);
//var extra_info=response.getDataTable().getValue(i,7);

//var yet_to_happen=response.getDataTable().getValue(i,8);

//var videos=response.getDataTable().getValue(i,9);

//var contact=response.getDataTable().getValue(i,10);
CreatemarkerandInfowindow(lat,lon,place,students_group_name);
}
});
}

function CreatemarkerandInfowindow(lat,lon,place,students_group_name)
{
Createmarker(lat,lon,place,students_group_name);
}
function Createmarker(lat,lon,place,students_group_name)
{
var myLatLng=new google.maps.LatLng(lat,lon);
var chooseicon;
var infocontent="place : "+place;
var image= {
			url:"../images/strike_logo.png",
			size:new google.maps.Size(39,63),
			anchor:new google.maps.Point(20,61),
			origin:new google.maps.Point(0,0)
			};
var marker = new google.maps.Marker({
position: myLatLng,
        map: map,
        icon:image
});

infowindow=new google.maps.InfoWindow();
infowindow.setContent(infocontent);
marker.infowindow=infowindow;

google.maps.event.addListener(marker,'mouseover',function(){
if(!!last_infowindow  && !!last_infowindow.infowindow)
{
	last_infowindow.infowindow.close();
}
last_infowindow=marker;
this.infowindow.open(this.map,this);
});
markersArray.push(marker);
}

function clearMarker()
{
if(markersArray)
{
for (i in markersArray )
{
markersArray[i].setMap(null);
}
}
}
