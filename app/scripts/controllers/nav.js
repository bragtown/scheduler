'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('NavCtrl', function ($scope, apptManager) {
	//this should just update the navigation when nav is clicked on
	$scope.logout = function(){
		apptManager.logout();
	}
  });
