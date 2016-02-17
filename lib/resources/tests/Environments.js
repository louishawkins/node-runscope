var _ = require('underscore'),
    Promise = require('bluebird');

function Environments (client, testId) {
    this.client = _.clone(client);
    this.testId = testId;

    if (testId) {
        this.client.namespace += '/' + testId + '/environments';
    } else {
        this.client.namespace += '/environments';
    }
}

Environments.prototype.list = function () {
    return this.client.get();
};

Environments.prototype.create = function (opts) {
    return this.client.post(opts);
};

Environments.prototype.detail = function (environmentId) {
    return this.client.get(environmentId);
};

Environments.prototype.delete = function (environmentId) {
    return this.client.delete(environmentId);
};

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
};


function diffAndUpdate (original, updated) {
    return original;
}

module.exports = Environments;
