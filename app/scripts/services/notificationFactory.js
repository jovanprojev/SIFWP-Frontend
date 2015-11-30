MyApp
    .factory('notificationFactory', ['$http','host',
    function($http, host){
            var service = {};

		    service.getNotifications = function(){
				return $http({
		  			method: 'GET',
		  			 url: host +'rest/notifications'
				});
			}


		service.getNotification = function(id){
			return $http({
				method: 'GET',
				url: host +'rest/notifications/'+id
			});
		}

			service.putNotification = function(notification){
				return $http({
					method: 'PUT',
					url: host +'rest/notifications/'+notification.id,
					data:notification
				});
			}


			service.deleteNotification = function(notification){
				return $http({
					method: 'DELETE',
					url: host +'rest/notifications/'+notification
				});
			}


			service.najavise=function(admin){
				return $http({
		  			method: 'POST',
		  			 url: host +'rest/login',
		  			 data:admin
				});
			}

			service.prebaruvajNotification= function(relation){
				return $http({
					method: 'POST',
					url: host +'rest/notifications/search',
					data:relation
				});
			}

		return service;
	}
]);