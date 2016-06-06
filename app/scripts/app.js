'use strict';

/**
 * @ngdoc overview
 * @name schedulerApp
 * @description
 * # schedulerApp
 *
 * Main module of the application.
 */
angular
  .module('schedulerApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCookies',
    'ui.router',
    'ui.calendar'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        resolve: {
          auth: function(apptManager){
            return apptManager.authenticate()
          }
        },
        views: {
          '':{
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          },
          'nav@home':{
            templateUrl: 'views/nav.html',
            controller: 'NavCtrl',
            controllerAs: 'nav'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('home.day', {
        url: '/day',
        resolve: {
          account: function(apptManager){
            return apptManager.getAccount()
          },
          scheduled: function(apptManager){
            return apptManager.getScheduled();
          },
          queued: function(apptManager){
            return apptManager.getQueued();
          }
        },

        templateUrl: 'views/partial-home-day.html',
        controller: 'DayCtrl',
        controllerAs: 'day'
      })
      .state('home.account', {
        url: '/account',
        resolve: {
          account: function(apptManager){
            return apptManager.getAccount()
          }
        },
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account'
      })
      // .state('home.month', {
      //   url: '/month',
      //   templateUrl: 'views/partial-home-month.html',
      //   controller: 'MonthCtrl',
      //   controllerAs: 'month'
      // });
  });
