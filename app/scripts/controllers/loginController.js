MyApp.controller('loginController', ['$scope','notificationFactory','$rootScope',
    function($scope,notificationFactory, $rootScope) {

    	$scope.najavise=function(){
    		var admin={};
    		admin.username=$scope.username;
    		admin.password=$scope.password;
    		notificationFactory.najavise(admin).then(function(response){
    			
    				console.log(response.data);
    			if(response.data!==""){
    				alert('Успешно се најавивте');
					$rootScope.adminlogin = true;
					$rootScope.close();
    			}
    			else{
    				alert('Неточно корисничко име или лозинка');
    			}

    		},function(error){
    			alert('Грешка');
    		});
    	};
}]);