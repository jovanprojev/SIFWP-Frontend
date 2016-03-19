MyApp.controller('mapController', ['$scope',function ($scope) {
        window.initMap = function () {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: {lat: 41.57, lng: 21.75}
            });



            directionsDisplay.setMap(map);
            var mapNotification = $scope.ngDialogData.mapNotification;
            calculateAndDisplayRoute(directionsService, directionsDisplay, mapNotification.relation.startDestination, mapNotification.relation.endDestination);
            mapNotification.pins.map(function(item){
                dodadiOznaka(item,map);
            });
        }


        function dodadiOznaka(pin, map) {
            if (pin.type === "KAFE_NA_PAT") {
                kafeNaPatot(pin, map);
            }
            else if (pin.type === "POLICIJA_NA_PAT") {
                policijaNaPatot(pin, map);
            }
            else if (pin.type === "RABOTA_NA_PAT") {
                rabotaNaPatot(pin, map);
            }
        }

        function kafeNaPatot(pin, map) {
            var image = 'http://i.imgur.com/9kBclSI.png';
            var latLng = {};
            latLng.lat = pin.latitude;
            latLng.lng = pin.longitude;
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: image,
            });
        };

        function policijaNaPatot(pin, map) {
            var image = 'http://i.imgur.com/ZngDRbU.gif';
            var latLng = {};
            latLng.lat = pin.latitude;
            latLng.lng = pin.longitude;
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: image,
            });

        };

        function rabotaNaPatot(pin, map) {
            var image = 'http://i.imgur.com/KQ9JxyW.png';
            var latLng = {};
            latLng.lat = pin.latitude;
            latLng.lng = pin.longitude;
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: image,
            });
        };

        function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
            directionsService.route({
                origin: start,
                destination: end,
                provideRouteAlternatives: true,
                travelMode: google.maps.TravelMode.DRIVING,
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    //window.alert('Directions request failed due to ' + status);
                }
            });
        }
    }]);
