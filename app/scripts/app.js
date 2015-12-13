'use strict';
var MyApp = angular.module('avAngularStartupApp', ['ngRoute','ngDialog','angularUtils.directives.dirPagination']);

MyApp.constant('host','https://sifwa-backend.herokuapp.com/');

MyApp.run(function($rootScope,ngDialog,$route,$location){
	var dialog;
	$rootScope.najava=function(){
		dialog = ngDialog.open({
			showClose:'true',
			closeByEscape:'true',
			closeByDocument:'true',
			template:'views/najava.html',
			controller:'loginController'
		})
	}

	$rootScope.naPateka=function(){
			$location.path( "/" );
			$route.reload();
	}

	$rootScope.odjavise=function(){
		$rootScope.adminlogin = false;
	}
	$rootScope.close=function(){
		dialog.close();
	}
});


