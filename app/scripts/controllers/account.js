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


    $scope.user = {
      fName: account.fName,
      lName: account.lName,
      email: account.email,
      curCalendar: apptManager.getUserCalendar().name
    }
    $scope.calendars = account.userCalendars
    $scope.calendar = account.userCalendars.find(function(curCal){
      return curCal.name === apptManager.getUserCalendar().name
    });
    var calUsersChanged = false
    $scope.removeUser = function(selUser){
      $scope.calendar.users.splice(selUser, 1)
      calUsersChanged = true
    }
  	//should allow ability to update password and username
  	$scope.updateUser = function(){
      console.log($scope.user)
  		apptManager.updateUser($scope.user);
  	}
  	//should get all calenders that currently have users email address probably from route
  	//should be able to select on as the users current calendar
  	//should allow the creation of a calendar
  	$scope.createCal = function(){
  		apptManager.createCal($scope.calName);
  	}
    $scope.updateCalUsers = function(){

      if($scope.newCalUser && $scope.newCalUser != ''){
        $scope.calendar.users.push($scope.newCalUser)
      }
      console.log($scope.newCalUser || calUsersChanged)
      if($scope.newCalUser || calUsersChanged)
        apptManager.updateCalUsers($scope.calendar)
      $scope.newCalUser = ''
    }
    $scope.resMessage = apptManager.getResponse()
  });
