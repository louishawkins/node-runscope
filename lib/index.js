/**
 * @module Runscope
 *
 * A promise-based library for interacting
 * with the Runscope API.
 */

var _ = require('underscore'),
    Client = require('./Client'),
    resources = require('./resources');

function Runscope (token) {
    if (! (this instanceof Runscope) ) {
        return new Runscope(token);
    }

    this.client = new Client(token);

    this.bucket = function (bucketKey) {
        return new resources.bucket(this.client, bucketKey);
    };
    
    this.teams = new resources.teams(this.client);
}

Runscope.prototype.bucketList = function () {
    return this.client.get('buckets');  
};

Runscope.prototype.account = function () {
    return this.client.get('account');
};

Runscope.prototype.regions = function () {
    return this.client.get('regions');
};

/**
 *  @param opts
 *      name: string The name of the bucket
 *      team_uuid: uuid Unique ID for the team to create this bucket for.
 */ 
Runscope.prototype.createBucket = function (opts) {
    return this.client.post(opts);
};

module.exports =  Runscope;
