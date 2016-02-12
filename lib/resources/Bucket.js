/**
 @module Bucket
*/

var resources = require('./index');

function Bucket (client, key) {
    this.bucketKey = key;
    this.client = client;
    this.client.namespace += '/' + key;

    this.tests = function () {
        return new resources.tests(this.client);
    }
}

/*Bucket.tests = function () {*/
    //return new resources.tests(this.client);
/*}*/

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

