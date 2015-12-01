MyApp.controller('notificationController', ['$scope', 'notificationFactory','$filter',
    function($scope, notificationFactory, $filter) {

    	var zemiIskustvo=function(){
    	notificationFactory.getNotifications().then(
    		function(response){
    			console.log(response.data);
		    	$scope.notification = response.data;
		    	$scope.notification = $filter('orderBy')($scope.notification, '-date');
				},
				function(error){
					alert('Obidi se povtorno');
				}
			);
		}

		zemiIskustvo();
		

		$scope.izbrisiIskustvo=function(notification){
			notificationFactory.deleteNotification(notification).then(
				function(response){
					console.log(response.data);
					zemiIskustvo();
				},
				function(error){
					alert('Обидете се повторно');
				}
			);
		}

		$scope.prebaruvaj=function(){
			var relation = {};
			relation.startDestination=$scope.start;
			relation.endDestination=$scope.end;
			notificationFactory.prebaruvajNotification(relation).then(
				function(response){
					$scope.notification = response.data;
				},
				function(error){
					alert('Обидете се повторно');
				}
			);
		}
}]);