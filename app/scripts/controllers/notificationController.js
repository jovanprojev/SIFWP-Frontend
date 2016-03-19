MyApp.controller('notificationController', ['$scope', 'notificationFactory','$filter','ngDialog',
    function($scope, notificationFactory, $filter,ngDialog) {

    	var zemiIskustvo=function(){
    	notificationFactory.getNotifications().then(
    		function(response){
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

		$scope.dodadiLike=function(notification){
			notificationFactory.likes(notification.id).then(
				function(response){
					notification.likes=response.data.likes;
					notification.liked = true;
				},
				function(error){
					alert('Се случи грешка!');
				}
			);
		}

		$scope.dodadiDislike=function(notification){
			notificationFactory.dislikes(notification.id).then(
				function(response){
					notification.dislikes=response.data.dislikes;
					notification.disliked = true;
				},
				function(error){
					alert('Се случи грешка!');
				}
			);
		}

		$scope.map=function(notification){
			var dialog = ngDialog.open({
				showClose:'true',
				closeByEscape:'true',
				closeByDocument:'true',
				template:'views/map.html',
				controller:'mapController',
				data: {
					mapNotification: notification
				}


			})
		}

		$scope.sortirajSporedLajkovi=function(){
			$scope.notification = $filter('orderBy')($scope.notification, '-likes');
			$scope.notification = $filter('limitTo')($scope.notification, 5, 0);
		}

		$scope.sortirajSporedDislajkovi=function(){
			$scope.notification = $filter('orderBy')($scope.notification, '-dislikes');
			$scope.notification = $filter('limitTo')($scope.notification, 5, 0);
		}
}]);