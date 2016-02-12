
function Schedules (client, testId, scheduleId) {
    this.client = client;
    this.testId = testId;
    this.scheduleId = scheduleId;
    this.client.namespace += '/' + testId + '/schedules';
}

Schedules.prototype.list = function () {
    this.client.get();
}

// environment_id, interval, note
Schedules.prototype.create = function (opts) {
    this.client.post(opts);
}

Schedules.prototype.details = function () {
    this.client.get(this.scheduleId);
}

// same as create opts
Schedules.prototype.modify = function (opts) {
    this.client.put(this.scheduleId, opts);
}

Schedules.prototype.delete = function () {
    this.client.delete(this.scheduleId);
}

Schedules.prototype.stop = this.delete;

module.exports = Schedules;

