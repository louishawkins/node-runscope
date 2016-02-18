var request = require('request-promise'),
    Promise = require('bluebird');

var defaultHost = 'https://api.runscope.com';

function Client (token) {
    if (!token) {
        throw new Error('Token is required');
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
       
    return request(options).then(function checkResponse (response) {
        if (response.error !== null) {
            throw new Error(response.error);
        }
        return response;
    });    
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

Client.prototype.delete = function (uri, data) {
    return this.request('DELETE', uri, data);
};

module.exports = Client;
