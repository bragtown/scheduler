'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.apptManager
 * @description
 * # apptManager
 * Factory in the schedulerApp.
 */
angular.module('schedulerApp')
  .factory('apptManager', function ($http, $state) {
    // Service logic
    // ...
    var server = "http://localhost:3000"
    var sendAppt = function(appt){
      //sends appt to server
      queued.push(appt)
    }

    var queued = [
      {
        scheduled: false,
        person: 'Some Person',
        apptType: 'Temple Recommend',
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

    var sendAppt = function(appt){
      if(appt.bishopricMember == 'Bishop'){
        appt.backgroundColor = '#ffa64d';
        appt.borderColor = '#ffa64d';
      }
      if(appt.bishopricMember == '1st'){
        appt.backgroundColor = '#ffff00';
        appt.borderColor = '#ffff00';
      }
      if(appt.bishopricMember == '2nd'){
        appt.backgroundColor = '#008000';
        appt.borderColor = '#008000';
      }

      if(appt.eventType == 'Availability'){
        appt.backgroundColor = 'white';
        appt.textColor = 'black';
      }
      if(appt.eventType == 'Busy'){
        appt.backgroundColor = 'grey';
      }
      if(appt.start){
        scheduled.push(appt);
      }
      else{
        appt.scheduled = false;
        queued.push(appt) 
      }  
    }

    var upAppt = function(appt){
      //send to server
      console.log('updating appointment...', appt);
      
    }

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
        sendAppt(appt);
      },
      updateAppt: function(appt){
        upAppt(appt);
      },
      authenticate: function(){
        console.log($http.defaults.headers)
        $http.get('http://localhost:3000/authenticate').then(function(res){
          if(res.data == '/login')
            $state.go('login');
        });
      },
      signup: function(user){
        console.log(user);
        $http.post(server + '/signup', user).then(function(res){
          console.log(res)
          $state.go(res.data)
        })
      },
      signin: function(user){
        $http.post(server + '/login', user).then(function(res){
          console.log(res);
          $state.go(res.data);
        })
      },
      logout: function(){
        $http.get(server + '/logout').then(function(res){
          $state.go(res.data);
        })
      }

    };
  });
