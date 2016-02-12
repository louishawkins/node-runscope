/**
 @module Bucket
*/

var resources = require('./index');

function Bucket (client, key) {
    this.bucketKey = key;
    this.client = client;
    this.client.namespace += '/' + key;
    
    this.environments = function (environmentId) {
        return new resources.environments(this.client, null, environmentId);
    }

    this.tests = function (testId) {
        return new resources.tests(this.client, testId);
    }
}

Bucket.prototype.detail = function () {
    return this.client.get();
}

Bucket.prototype.delete = function () {
    return this.client.delete();
}

Bucket.prototype.clear = function () {
    return this.client.delete('messages');
}

module.exports = Bucket;

