MyApp.controller('putController', ['$scope', 'notificationFactory','$routeParams','$location','$rootScope','$route',
    function($scope, notificationFactory, $routeParams,$location,$rootScope,$route) {

        if(!$rootScope.adminlogin){
            $location.path('/');
            $route.reload();
        }  
        var today = new Date();
        
        $scope.maxDatum =  $filter('date')(new Date(today),'yyyy-MM-dd');  
        
        var id = $routeParams.id;

        $scope.editMode=true;

        var getNotification = function(id){
            notificationFactory.getNotification(id).then(
                function (response) {
                    console.log(response.data);
                    $scope.notification = response.data;
                },
                function (error) {
                    alert('Обидете се повторно');
                }
            )
        }

        getNotification(id);



        $scope.iskustvo = function () {
            notificationFactory.putNotification($scope.notification).then(
                function (response) {
                    console.log(response.data);
                   alert('Вашето искуство е успешно изменето');
                   $location.path('/');
                },
                function (error) {
                    alert('Обидете се повторно');
                }
            );
        }
    }]);