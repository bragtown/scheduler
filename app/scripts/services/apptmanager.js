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
    //var server = "http://localhost:3000"
    var server = "http://localhost:3000"



    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();


    //scheduled data
    //title, start, end, allDay, 


    var resMessage = {
      message: undefined,
      status: undefined,
      getClass: function(){
        if(this.status >= 200 && this.status < 300)
          return 'bg-success'
        else if(this.status >= 400 && this.status < 600)
          return 'bg-danger'
        else
          return ''
      },
      reset: function(){
        this.message = undefined;
        this.status = undefined;
      }

    }

    var upAppt = function(appt){
      //send to server
      console.log('updating appointment...', appt);
      
    }
    var curUserCalendar = {
      name: undefined
    }
    // Public API here
    return {
      getResponse:function(){
        return resMessage;
      },
      getQueued: function () {
        return $http.get(server + '/queued').then(function(res){
          console.log(res.data);
          return res.data
        });
      },
      getScheduled: function(){
        return $http.get(server + '/scheduled').then(function(res){
          for(var i = 0; i < res.data.length; i++){
            res.data[i].start = new Date((res.data[i].start));
            res.data[i].end = new Date((res.data[i].end));
          }
          console.log(res.data);
          return res.data
        });
      },
      addAppt: function(appt){
        //sendAppt(appt);
        $http.post(server + '/events', appt).then(function(res){
          resMessage.message = res.data.message;
          resMessage.status = res.data.status;
        })
      },
      updateAppt: function(appt){
        //upAppt(appt);
        $http.put(server + '/events', appt).then(function(res){
          resMessage.message = res.data.message;
          resMessage.status = res.data.status;
        })
      },
      deleteEvent: function(appt){
        $http.delete(server + '/events/'+ appt._id).then(function(res){
          console.log(res.data);
        })
      },
      authenticate: function(){
        console.log($http.defaults.headers)
        $http.get(server + '/authenticate').then(function(res){
          console.log(res);
          if(res.data == 'login')
            $state.go('login');
        });
      },
      signup: function(user){
        console.log(user);
        $http.post(server + '/signup', user).then(function(res){
          console.log(res)
          if(res.data.redirect)
            $state.go(res.data.redirect)
        })
      },
      signin: function(user){
        $http.post(server + '/login', user).then(function(res){
          console.log(res);
          if(res.data.redirect)
            $state.go(res.data.redirect);
        })
      },
      logout: function(){
        $http.get(server + '/logout').then(function(res){
            $state.go(res.data.redirect);
        })
      },
      updateUser: function(user){
        $http.put(server + '/account', user).then(function(res){
          resMessage.message = res.data.message;
          resMessage.status = res.data.status;
          curUserCalendar.name = res.data.curCalendar;
          console.log(res.data.curCalendar)
        })
      },
      createCal: function(cal){
        $http.post(server+'/calendar', {calName: cal}).then(function(res){
          console.log(res);
          if(res.data.redirect)
            $state.go(res.data.redirect);
          else{              
            resMessage.message = res.data.message;
            resMessage.status = res.data.status;
          }
        })
      },
      getAccount:function(){
        return $http.get(server+'/account').then(function(res){
          if(res.data.redirect)
            $state.go(res.data.redirect);
          else{              
            resMessage.message = res.data.message;
            resMessage.status = res.data.status;
          }
          curUserCalendar.name = res.data.curCalendar; 
          return res.data
        })
      },
      updateCalUsers:function(cal){
        return $http.put(server+'/calendar', cal).then(function(res){
            resMessage.message = res.data.message;
            resMessage.status = res.data.status;
          })
      },
      getUserCalendar:function(){
        return curUserCalendar
      }

    };
  });
