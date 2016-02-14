var _ = require('underscore');

function Teams (client, teamId) {
    this.client = _.clone(client);
    this.teamId = teamId;
}

Teams.prototype.listMembers = function () {
    return this.client.get(this.teamId + '/people');
};

Teams.prototype.listIntegrations = function () {
    return this.client.get(this.teamId + '/integrations');
};

module.exports = Teams;

