/**
 @module Bucket
*/

var resources = require('./index');

function Bucket (client, key) {
    this.bucketKey = key;
    this.client = client;
    this.client.namespace += '/buckets/' + key;
    
    this.environments = function (environmentId) {
        return new resources.environments(this.client, null, environmentId);
    }

    this.tests = function (testId) {
        return new resources.tests(this.client, testId);
    }
}

Bucket.prototype.detail = function () {
    this.client.get();
}

Bucket.prototype.delete = function () {
    this.client.delete();
}

Bucket.prototype.clear = function () {
    this.client.delete('messages');
}

//messages api
//opts: count (int), since (timestamp), before (timestamp)
Bucket.prototype.messages = function (opts) {
    this.client.get('messages', opts);
}

Bucket.prototype.errors = function (opts) {
    this.client.get('errors', opts);
}

Bucket.prototype.shared = function (opts) {
    this.client.get('shared', opts);
}

Bucket.prototype.captures = function (opts) {
    this.client.get('captures', opts);
}

module.exports = Bucket;

