'use strict';

describe('Controller: WeekCtrl', function () {

  // load the controller's module
  beforeEach(module('schedulerApp'));

  var WeekCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeekCtrl = $controller('WeekCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WeekCtrl.awesomeThings.length).toBe(3);
  });
});
