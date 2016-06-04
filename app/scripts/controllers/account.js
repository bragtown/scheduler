'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('AccountCtrl', function ($scope, apptManager, account) {

    console.log(account)
    $scope.user = {
      fName: account.fName,
      lName: account.lName,
      email: account.email
    }
  	//should allow ability to update password and username
  	$scope.updateUser = function(){
  		apptManager.updateUser($scope.user);
  	}
  	//should get all calenders that currently have users email address probably from route
  	//should be able to select on as the users current calendar
  	//should allow the creation of a calendar
  	$scope.createCal = function(){
  		apptManager.createCal($scope.calName);
  	}
  });
