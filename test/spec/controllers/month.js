'use strict';

describe('Controller: MonthCtrl', function () {

  // load the controller's module
  beforeEach(module('schedulerApp'));

  var MonthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonthCtrl = $controller('MonthCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MonthCtrl.awesomeThings.length).toBe(3);
  });
});
