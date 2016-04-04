MyApp.controller('addController', ['$scope', 'addFactory','$location','$filter','$rootScope','datetime',
    function($scope, addFactory, $location,$filter,$rootScope,datetime) {

    	var today = new Date();
    	$scope.maxDatum =  $filter('date')(new Date(today),'yyyy-MM-dd');
		var oznaka = undefined;

		var pinovi = [];
		window.change = function(elem){
			oznaka = elem.value;
		}

    	$scope.iskustvo=function(){
			if(pinovi.length<1){
				alert("Ве молиме внесете пинови на мапата за да им помогнете на корисниците.");
				return;
			}
			
			var md = new Date();
			if($scope.notification.date > md){
				alert("Датумот е невалиден");
				return;
			}
			
		addFactory.addKorisnik($scope.notification.user).then(
			function(response){
    				$scope.notification.user = response.data;
    				addFactory.addRelacija($scope.notification.relation).then(
    					function(response){
		    				$scope.notification.relation = response.data;
		    				    		addFactory.addNotification($scope.notification).then(
						    			function(response){
											addFactory.addPins(response.data.id,pinovi).then(function(response){
												alert('Успешно е додадено вашето искуство');
												$location.path('/');
											},function(error){

											});
						    			},
						    			function(error){
						    				alert('Обидете се повторно');
						    			}
						    			);
		    			},
		    			function(error){
		    				alert('Обидете се повторно');
		    			});
    			},
    			function(error){
    				alert('Обидете се повторно');
    			});
    	}
		window.initMap = function() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: 41.57, lng: 21.75}
        });


        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
		map.addListener('click', function(e) {
			if(oznaka===undefined){
				alert("Ве молиме одберете каков пин сакате да поставите.");
				return;
			}
		  dodadiOznaka(e, map);
		});
	  }


	  function dodadiOznaka(e,map){
	  if(oznaka==1){
        kafeNaPatot(e.latLng, map);
		}
		else if(oznaka==2){
			policijaNaPatot(e.latLng, map);
		}
		else if(oznaka==3){
			rabotaNaPatot(e.latLng, map);
			}
      }

	  function kafeNaPatot(latLng, map) {
		 console.log(JSON.stringify(latLng));
	 	var image = 'http://i.imgur.com/9kBclSI.png';
		var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		icon: image,
		});
		//map.panTo(latLng);
		var pin = {};
			pin.type = 'KAFE_NA_PAT';
		    pin.latitude=latLng.lat();
		    pin.longitude=latLng.lng();
		    pinovi.push(pin);
		};

		function policijaNaPatot (latLng, map){
			var image = 'http://i.imgur.com/ZngDRbU.gif';
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: image,
			});
			var pin = {};
				pin.type = 'POLICIJA_NA_PAT';
				pin.latitude=latLng.lat();
				pin.longitude=latLng.lng();
				pinovi.push(pin);
		};

		function rabotaNaPatot (latLng, map){
			var image = 'http://i.imgur.com/KQ9JxyW.png';
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: image,
			});
			var pin = {};
				pin.type = 'RABOTA_NA_PAT';
				pin.latitude=latLng.lat();
				pin.longitude=latLng.lng();
				pinovi.push(pin);
		};

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
		  provideRouteAlternatives: true,
          travelMode: google.maps.TravelMode.DRIVING,
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            //window.alert('Directions request failed due to ' + status);
          }
        });
      }


}]);