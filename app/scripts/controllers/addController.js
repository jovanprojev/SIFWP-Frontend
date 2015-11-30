'use strict';

/**
 * @ngdoc Simple controller definition that have the $scope and firstService
 *        injected by angular. The $scope is the glue between the controller 
 *        and the view that displays the information. The controller is not 
 *        aware about the view that displays the information. 
 *        
 * @name avAngularStartupApp.controller:MainCtrl
 * @description # MainCtrl Controller of the avAngularStartupApp
 */

MyApp.controller('addController', ['$scope', 'addFactory','$location',
    function($scope, addFactory, $location) {

    	$scope.dodadiIskustvo=function(){
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