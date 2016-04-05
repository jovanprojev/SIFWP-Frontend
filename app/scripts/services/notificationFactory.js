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

			service.likes=function(id){
				return $http({
					method:'POST',
					url: host +'rest/notifications/like',
					params:{
						'id':id
					}
				})
			}

			service.dislikes=function(id){
				return $http({
					method:'POST',
					url: host +'rest/notifications/dislike',
					params:{
						'id':id
					}
				})
			}
			
			service.findPinByMinutes=function(minutes){
				return $http({
					method:'GET',
					url: host +'rest/pin/getPins',
					params:{
						'time':minutes
					}
				})
			}

		return service;
	}
]);