
function Results (client, testId, testRunId) {
    this.client = client;
    this.testId = testId;
    this.testRunId = testRunId;
    this.client.namespace += '/' + testId + '/results';
}

Results.prototype.list = function () {
    this.client.get();
}

Results.prototype.detail = function () {
    this.client.get(this.testRunId);
}

Results.prototype.latest = function () {
    this.client.get('latest');
}

module.exports = Results;

