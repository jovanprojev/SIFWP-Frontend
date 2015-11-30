'use strict';

/**
 * @ngdoc Definition of the application module. The first argument is the name
 *        of the module. It is used in the ng-app directive to expose the
 *        angular components that can be used. The second argument is an array
 *        that defines the dependencies (modules) that are used by the
 *        application. In this case we are only use the ngRoute module as a
 *        dependency in order to provide partial content inclusion through the
 *        routes
 * @see router.js for more information
 * @name avAngularStartupApp - the name of the module used in the ng-app
 *       directive
 * @description # avAngularStartupApp Main module of the application.
 */
var MyApp = angular.module('avAngularStartupApp', ['ngRoute','ngDialog']);


MyApp.constant('host','http://localhost:9966/web/');

MyApp.run(function($rootScope,ngDialog){
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

	$rootScope.odjavise=function(){
		$rootScope.adminlogin = false;
	}
	$rootScope.close=function(){
		dialog.close();
	}
});

