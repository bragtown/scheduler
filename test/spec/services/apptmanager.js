'use strict';

describe('Service: apptManager', function () {

  // load the service's module
  beforeEach(module('schedulerApp'));

  // instantiate service
  var apptManager;
  beforeEach(inject(function (_apptManager_) {
    apptManager = _apptManager_;
  }));

  it('should do something', function () {
    expect(!!apptManager).toBe(true);
  });

});
