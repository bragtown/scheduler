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
	$scope.navs = {
		'Calendar': true,
		'Account': false
	}
	$scope.isActive = function(nav){
		return $scope.navs[nav] ? 'active' : '';
	}
	$scope.activate = function(nav){
		if(!$scope.navs[nav]){
			for(var navId in  $scope.navs){
				$scope.navs[navId] = nav === navId
			}
		}
	}
  });
