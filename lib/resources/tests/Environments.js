var Promise = require('bluebird');

function Environments (client, testId, environmentId) {
    this.client = client;
    this.environmentId = environmentId;

    if (testId) {
        this.client.namespace += '/' + testId + '/environments';
    } else {
        this.client.namespace += '/environments';
    }
}

Environments.prototype.list = function () {
    this.client.get();
}

Environments.prototype.create = function (opts) {
    this.client.post(opts);
}

Environments.prototype.detail = function () {
    this.client.get(this.environmentId);
}

Environments.prototype.delete = function () {
    this.client.delete(this.environmentId);
}

Environments.prototype.modify = function (opts) {
    //this involves getting the environment, diffing the options, and 
    //doing a put request;
    //pretty much pseudocode right now
    var self = this;
    
    return new Promise(function(resolve, reject) {
        self.detail().then(function (original) {
            var update = diffAndUpdate(original, opts);
            self.client.put(self.environmentId, update).then(resolve).catch(reject);    
        }).catch(reject);
    })    
}


function diffAndUpdate (original, new) {
    return original;
}

module.exports = Environments;

