/**
 @module runscope

 A helper library for the Runscope REST API.
 */

var Bucket = require('./resources/Bucket');
var Client = require('./Client');

function Runscope (token) {
    if (! (this instanceof Runscope) ) {
        return new Runscope(token);
    }

    this.client = new Client(token);
    this.client.namespace = '/buckets';

    this.Bucket = function (bucketKey) {
        return new Bucket(this.client, bucketKey);
    }
}

Runscope.prototype.bucketList = function () {
  return this.client.get();  
} 

/**
 *  @param opts
 *      name: string The name of the bucket
 *      team_uuid: uuid Unique ID for the team to create this bucket for.
 */ 
Runscope.prototype.create = function (opts) {
    return this.client.post(opts);
}

module.exports =  Runscope;
