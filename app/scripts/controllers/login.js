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
  	// this should send login information to a service from the login screen
  	$scope.isActive = function(){
  		if($scope.active == true){
  			return "active";
  		}
  		else{
  			return '';
  		}
  	}
  	$scope.isNotActive = function(){
  		if($scope.active != true){
  			return "active";
  		}
  		else{
  			return '';
  		}
  	}
  	$scope.active = true;
  	$scope.signin = function(){
  		apptManager.signin($scope.user);
  	}

  	$scope.signup = function(){
  		apptManager.signup($scope.sign);
  	}
  });
