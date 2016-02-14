var _ = require('underscore');

function Teams (client) {
    this.client = _.clone(client);
}

Teams.prototype.listMembers = function (teamId) {
    return this.client.get(teamId + '/people');
};

Teams.prototype.listIntegrations = function (teamId) {
    return this.client.get(teamId + '/integrations');
};

module.exports = Teams;
