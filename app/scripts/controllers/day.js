'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:DayCtrl
 * @description
 * # DayCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('DayCtrl', function ($scope, $compile, uiCalendarConfig, apptManager) {
  	// this should accept an array from a service of scheduled appiontments and inject them into the day view, along with availabilities
  	//should send new availabilities and scheduled appointments from the service

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = apptManager.getScheduled();
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    $scope.dayClick = function(date, jsEvent, view){
    	console.log(view)
    	if(view.name == 'month')
    		$scope.gotoDate('myCalendar1', date);
    	if(view.name == 'agendaDay'){
    		$scope.addEventDisplay = true;
    		$scope.newEvent.start = date._d
    	}
    }

    $scope.newEvent = {
    	start: new Date(),
    	duration: 30,
    	end: new Date(),
    	person: "",

    }

    /* add custom event*/
    $scope.addEvent = function() {
    	var curTitle = "";
    	if($scope.newEvent.eventType == "Appointment"){
    		$scope.newEvent.end = new Date(($scope.newEvent.start.getTime() + 1000*60*$scope.newEvent.duration));
    		curTitle = $scope.newEvent.person

    	}
    	else if($scope.newEvent.eventType == "Availbility" || $scope.newEvent.eventType == "Busy"){
    		$scope.duration = ($scope.newEvent.end.getTime() - $scope.newEvent.start.endTime())/60/1000
    		curTitle = $scope.newEvent.eventType
    	}
    	apptManager.addAppt({
    		title: curTitle,
    		eventType: $scope.newEvent.eventType,
    		start: $scope.newEvent.start,
    		person: $scope.newEvent.person,
    		apptType: $scope.newEvent.apptType,
    		duration: $scope.newEvent.duration,
    		end: $scope.newEvent.end,
    		comments: $scope.newEvent.comments,
    		bishopricMember: $scope.newEvent.bishopricMember
    	})
    };
    $scope.gotoDate = function(calendar, date){
    	$scope.changeView('agendaDay', calendar);
    	uiCalendarConfig.calendars[calendar].fullCalendar('gotoDate',date);

    }	
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
        dayClick: $scope.dayClick 
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

  });
