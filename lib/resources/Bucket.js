/**
 @module Bucket
*/

var _ = require('underscore'),
    resources = require('./index');

function Bucket (client, key) {
    this.bucketKey = key;
    this.client = _.clone(client);
    this.client.namespace += '/buckets/' + key;
    this.environments = new resources.environments(this.client);
    this.tests = new resources.tests(this.client);
    this.test = function (testId) {
        return new resources.tests(_.clone(client), testId);
    }
}

Bucket.prototype.detail = function () {
    return this.client.get();
};

Bucket.prototype.delete = function () {
    return this.client.delete();
};

Bucket.prototype.clear = function () {
    return this.client.delete('messages');
};

Bucket.prototype.listTests = function () {
    return this.client.get('tests');
};

Bucket.prototype.findTestByName = function (name) {
    var client = this.client;

    return this.listTests().then(function (response) {
        var tests = response && response.data;
        var find = _.find(tests, function (test) {
            return test.name && test.name.indexOf(name) > -1;
        });

        if (find && find.id) {
            return new resources.tests(client, find.id);
        }
    });
};

//messages api
//opts: count (int), since (timestamp), before (timestamp)
Bucket.prototype.messages = function (opts) {
    return this.client.get('messages', opts);
};

Bucket.prototype.errors = function (opts) {
    return this.client.get('errors', opts);
};

Bucket.prototype.shared = function (opts) {
    return this.client.get('shared', opts);
};

Bucket.prototype.captures = function (opts) {
    return this.client.get('captures', opts);
};

module.exports = Bucket;
