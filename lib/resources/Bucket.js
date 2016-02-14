/**
 @module Bucket
*/

var _ = require('underscore');
var Promise = require('bluebird');
var resources = require('./index');

function Bucket (client, key) {
    this.bucketKey = key;
    this.client = _.clone(client);
    this.client.namespace += '/buckets/' + key;
    this.environments = new resources.environments(this.client);
    this.tests = new resources.tests(this.client);
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
    return new Promise(function (resolve, reject) {
        this.listTests().then(function (tests) {
            resolve(_.find(tests, function (test) {
                return test.name && test.name.indexOf(name) > -1;
            }));
        }).catch(reject);
    });
};

//messages api
//opts: count (int), since (timestamp), before (timestamp)
Bucket.prototype.messages = function (opts) {
    this.client.get('messages', opts);
};

Bucket.prototype.errors = function (opts) {
    this.client.get('errors', opts);
};

Bucket.prototype.shared = function (opts) {
    this.client.get('shared', opts);
};

Bucket.prototype.captures = function (opts) {
    this.client.get('captures', opts);
};

module.exports = Bucket;

