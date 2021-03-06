'use strict';

describe('Controller: QueueCtrl', function () {

  // load the controller's module
  beforeEach(module('schedulerApp'));

  var QueueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QueueCtrl = $controller('QueueCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(QueueCtrl.awesomeThings.length).toBe(3);
  });
});
