'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('LoginCtrl', function ($scope, apptManager) {
	$scope.tabs = {
		'login': true,
		'signup': false
	};

  	// this should send login information to a service from the login screen
  	$scope.isActive = function (tab){
		return $scope.tabs[tab] ? 'active' : '';
  	};

	$scope.activate = function (tab) {
		if (!$scope.tabs[tab]) {
			for (var tabId in $scope.tabs) {
				$scope.tabs[tabId] = tab === tabId;
			}
		}
	};

  	$scope.active = true;
  	$scope.signin = function(){
  		apptManager.signin($scope.user);
  	}

  	$scope.signup = function(){
  		apptManager.signup($scope.sign);
  	}
  });
