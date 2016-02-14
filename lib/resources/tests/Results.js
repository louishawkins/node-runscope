var _ = require('underscore');

function Results (client, testId) {
    this.client = _.clone(client);
    this.testId = testId;
    this.client.namespace += '/' + testId + '/results';
}

Results.prototype.list = function () {
    this.client.get();
};

Results.prototype.detail = function (testRunId) {
    this.client.get(testRunId);
};

Results.prototype.latest = function () {
    this.client.get('latest');
};

module.exports = Results;
