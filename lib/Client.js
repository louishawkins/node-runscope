var request = require('request-promise');
var Promise = require('bluebird');

var defaultHost = 'https://api.runscope.com';

function Client (token) {
    if (!token) {
        return;
    }
    this.token = token;
    this.hostname = defaultHost;
    this.headers = {
        'Authorization': 'Bearer ' + token 
    };
    if (!this.namespace) this.namespace = '';
}

Client.prototype.request = function (method, uri, data) {
    if (!method) method = 'GET';
    if (!uri) uri = '';

    if (typeof uri === 'object') {
        data = uri;
        uri = '';
    } else if (uri.indexOf('/') !== 0 && uri.indexOf('http') !== 0) {
        uri = '/' + uri;
    }
     
    var options = {
        method: method,
        headers: this.headers
    };

    if (uri.indexOf('http') === 0) {
        options.uri = uri; //full uri provided
    } else {
        options.uri = this.hostname + this.namespace + uri; //otherwise build
    }

    if (data) {
        if (method !== 'GET') {
            options.body = data;
        } else {
            options.qs = data;
        }
     }

    options.json = true;
    
    return request(options);    
};

Client.prototype.delete = function (uri, data) {
    return this.request('DELETE', uri, data);
};

Client.prototype.get = function (uri, data) {
    return this.request('GET', uri, data);
};

Client.prototype.post = function (uri, data) {
    return this.request('POST', uri, data);
};

Client.prototype.put = function (uri, data) {
    return this.request('PUT', uri, data);
};

/**
 *  @func route
 *  @returns function
 *
 *  Give it a natural path this.route('get', 'buckets', bucketId)
 *  Will return a function that when invoked will make a GET request
 *  to the route 'https://api.runscope.com/buckets/bucketId'
 */
Client.prototype.route = function () {
    var self = this;
    var args = [].slice.apply(arguments);
    var method = args.shift();

    if (['get', 'post', 'put', 'delete'].indexOf(method.toLowerCase()) < 0) {
        return;
    }

    var uri = args.join('/');

    return function (opts) {
        return this[method](uri, opts);
    }.bind(this);
}

module.exports = Client;
