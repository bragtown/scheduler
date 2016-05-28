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
    var sendAppt = function(appt){
      //sends appt to server
      queued.push(appt)
    }

    var queued = [
      {
        scheduled: false,
        person: 'Some Person',
        type: 'Temple Recommend',
        availability: 'Anytime on Sunday',
        comments: 'Would like to visit with Bishop'
      }
    ]; //ask for queued appointments from server

    // Public API here
    return {
      getQueued: function () {
        return queued;
      },
      setQueued: function(appt) {
        sendAppt(appt);
      }
    };
  });
