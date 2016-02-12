
function Teams (client, teamId) {
    this.client = client;
    this.teamId = teamId;
}

Teams.prototype.listMembers = function () {
    this.client.get(this.teamId + '/people');
}

Teams.prototype.listIntegrations = function () {
    this.client.get(this.teamId + '/integrations');
}

module.exports = Teams;

