/**
 @module runscope

 A helper library for the Runscope REST API.
 */
var _ = require('underscore');
var Client = require('./Client');
var resources = require('./resources');

function Runscope (token) {
    if (! (this instanceof Runscope) ) {
        return new Runscope(token);
    }

    this.client = new Client(token);

    this.bucket = function (bucketKey) {
        return new resources.bucket(this.client, bucketKey);
    }
    
    this.teams = function (teamId) {
        return new resources.teams(this.client, teamId);
    }
}

Runscope.prototype.bucketList = function () {
  return this.client.get('buckets');  
} 

Runscope.prototype.account = function () {
    this.client.get('account'); 
}

Runscope.prototype.regions = function () {
    this.client.get('regions');
}

/**
 *  @param opts
 *      name: string The name of the bucket
 *      team_uuid: uuid Unique ID for the team to create this bucket for.
 */ 
Runscope.prototype.createBucket = function (opts) {
    return this.client.post(opts);
}

module.exports =  Runscope;
