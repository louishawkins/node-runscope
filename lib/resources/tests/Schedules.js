var _ = require('underscore');

function Schedules (client, testId, scheduleId) {
    this.client = _.clone(client);
    this.testId = testId;
    this.scheduleId = scheduleId;
    this.client.namespace += '/' + testId + '/schedules';
}

Schedules.prototype.list = function () {
    return this.client.get();
};

// environment_id, interval, note
Schedules.prototype.create = function (opts) {
    return this.client.post(opts);
};

Schedules.prototype.details = function () {
    return this.client.get(this.scheduleId);
};

// same as create opts
Schedules.prototype.modify = function (opts) {
    return this.client.put(this.scheduleId, opts);
};

Schedules.prototype.delete = function () {
    return this.client.delete(this.scheduleId);
};

Schedules.prototype.stop = this.delete;

module.exports = Schedules;

