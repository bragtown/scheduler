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
    'ui.router',
    'ui.calendar'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
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
          },
          'day@home':{
            templateUrl: 'views/partial-home-day.html',
            controller: 'DayCtrl',
            controllerAs: 'day'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      // .state('home.day', {
      //   url: '/day',
      //   templateUrl: 'views/partial-home-day.html',
      //   controller: 'DayCtrl',
      //   controllerAs: 'day'
      // })
      // .state('home.week', {
      //   url: '/week',
      //   templateUrl: 'views/partial-home-week.html',
      //   controller: 'WeekCtrl',
      //   controllerAs: 'week'
      // })
      // .state('home.month', {
      //   url: '/month',
      //   templateUrl: 'views/partial-home-month.html',
      //   controller: 'MonthCtrl',
      //   controllerAs: 'month'
      // });
  });
