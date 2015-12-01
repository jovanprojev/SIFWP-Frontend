MyApp.controller('addController', ['$scope', 'addFactory','$location',
    function($scope, addFactory, $location) {

    	$scope.iskustvo=function(){
		addFactory.addKorisnik($scope.notification.user).then(
			function(response){
    				$scope.notification.user = response.data;
    				addFactory.addRelacija($scope.notification.relation).then(
    					function(response){
		    				$scope.notification.relation = response.data;
		    				    		addFactory.addNotification($scope.notification).then(
						    			function(response){
						    				alert('Успешно е додадено вашето искуство');
											$location.path('/');
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
}]);