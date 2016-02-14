var _ = require('underscore');

function Schedules (client, testId) {
    this.client = _.clone(client);
    this.testId = testId;
    this.client.namespace += '/' + testId + '/schedules';
}

Schedules.prototype.list = function () {
    return this.client.get();
};

// environment_id, interval, note
Schedules.prototype.create = function (opts) {
    return this.client.post(opts);
};

Schedules.prototype.details = function (scheduleId) {
    return this.client.get(scheduleId);
};

// same as create opts
Schedules.prototype.modify = function (scheduleId, opts) {
    return this.client.put(scheduleId, opts);
};

Schedules.prototype.delete = function (scheduleId) {
    return this.client.delete(scheduleId);
};

Schedules.prototype.stop = this.delete;

module.exports = Schedules;
