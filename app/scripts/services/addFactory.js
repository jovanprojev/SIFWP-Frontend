MyApp
    .factory('addFactory', ['$http', 'host',
        function ($http, host) {
            var service = {};

            service.addNotification = function (notification) {
                return $http({
                    method: "POST",
                    url: host + 'rest/notifications',
                    data: notification
                });
            },

                service.addKorisnik = function (korisnik) {
                    return $http({
                        method: "POST",
                        url: host + 'rest/users',
                        data: korisnik
                    });
                },
                service.addRelacija = function (relation) {
                    return $http({
                        method: "POST",
                        url: host + 'rest/relations',
                        data: relation
                    });
                },
                service.addPins = function (notificationId, pins) {
                    return $http({
                        method: "POST",
                        url: host + 'rest/pin/addPins',
                        data: pins,
                        params:{
                            notificationId:notificationId
                        }
                    });
                }

            return service;
        }
    ]);
