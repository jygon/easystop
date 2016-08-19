var app = angular.module('starter', ['ionic', 'ngCordova']);
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
function showMap(lat, long){
    var myLatLng = new google.maps.LatLng(lat, long);
    var mapOptions = {
        center: myLatLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var contentString = '<div id="content">'+
                            '<div id="siteNotice">'+
                            '</div>'+
                            '<p><b>Estacionamento Coberto</b></p>'+
                            '<div id="bodyContent">'+
                                '<p>Rua Cristiano Viana, 1399</p>'+
                                '<p><b>Períodos:</b>mensal e avulso</p>'+
                                '<p><b>Dias:</b>de segunda a sexta</p>'+
                                '<p><b>Horários:</b>das 8 às 18hs</p>'+
                                '<p><a href="/solicitar.html">solicitar vaga mensal<a/></p>'+
                                '<p><a href="/solicitar.html">solicitar vaga avulsa<a/></p>'+
                            '</div>'+
                        '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var image = 'img/micro_house.png';
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      title: 'Hello World!'
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    return map;
}
app.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

    $ionicPlatform.ready(function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            $scope.map = showMap(lat, long);
            $ionicLoading.hide();
        }, function(err) {
            console.log(err);
            alert('Não encontramos sua localização.\r\nVerifique seu GPS');
            $scope.map = showMap(-23.5517084,-46.6823255);
            $ionicLoading.hide();
        });
    });
});
