'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.apptManager
 * @description
 * # apptManager
 * Factory in the schedulerApp.
 */
angular.module('schedulerApp')
  .factory('apptManager', function () {
    // Service logic
    // ...
    var sendAppt = function(){
      //sends appt to server
    }

    var queued = []; //ask for queued appointments from server

    // Public API here
    return {
      getQueued: function () {
        return queued;
      },
      setQueued: function(appt) {
        sendAppt();
      }
    };
  });
