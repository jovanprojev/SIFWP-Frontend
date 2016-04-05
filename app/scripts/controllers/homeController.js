MyApp.controller('homeController', ['$scope', 'notificationFactory','datetime',
    function($scope, notificationFactory,datetime) {
		
		$scope.selectedIndex = 0;
		var map;
		var pinovi = [];
		
		$scope.select = function(index){
			clearPins();
			$scope.selectedIndex = index;
			request($scope.sliderElements[index]);
		}
		
		var init = function(){
			$scope.sliderElements = [];
			var elem = {
				value : '30 мин',
				className : 'btn-success',
				time: 30
			};
			$scope.sliderElements.push(elem);
			
			elem = {
				value : '1 час',
				className : 'btn-success',
				time: 60
			};
			$scope.sliderElements.push(elem);
			
			elem = {
				value : '2 часa',
				className : 'btn-success',
				time: 120
			};
			
			$scope.sliderElements.push(elem);
			
			elem = {
				value : '3 часa',
				className : 'btn-success',
				time: 180
			};
			
			$scope.sliderElements.push(elem);
			
			elem = {
				value : '6 часа',
				className : 'btn-warning',
				time: 360
			};
			
			$scope.sliderElements.push(elem);
			
			elem = {
				value : '12 часa',
				className : 'btn-warning',
				time: 720
			};
			
			$scope.sliderElements.push(elem);
			
			elem = {
				value : '1 ден',
				className : 'btn-danger',
				time: 1440
			};
			$scope.sliderElements.push(elem);
			
			elem = {
				value : '3 дена',
				className : 'btn-danger',
				time: 4320
			};
			$scope.sliderElements.push(elem);
			
		}
		
		init();
		 window.initMap = function () {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: {lat: 41.57, lng: 21.75}
            });
			request ($scope.sliderElements[0]);
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
			pinovi.push(marker);
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
			pinovi.push(marker);

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
			pinovi.push(marker);
        };
		
		function clearPins(){
			for(var i = 0; i < pinovi.length; i++){
				pinovi[i].setMap(null);
			}
		}
		
		function request (elem){
			notificationFactory.findPinByMinutes(elem.time).then(
			function(response){
				var pins = response.data;
				initPin(pins);
			
			}, function(error){
				
			});
		}
		
		function initPin (pins){
			for(index in pins){
				var elem = pins [index]; 
				dodadiOznaka(elem,map);
			}
		}
}]);