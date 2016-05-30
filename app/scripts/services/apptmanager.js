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



    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();


    //scheduled data
    //title, start, end, allDay, 
    var scheduled =  [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];

    // Public API here
    return {
      getQueued: function () {
        return queued;
      },
      setQueued: function(appt) {
        sendAppt(appt);
      },
      getScheduled: function(){
        return scheduled;
      },
      addAppt: function(appt){
        scheduled.push(appt);
      }
    };
  });
