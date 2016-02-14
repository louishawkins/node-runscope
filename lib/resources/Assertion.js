/**
 * WIP: Builds asertion objects.
 * @param string
 * @constructor
 */

function Assertion (string) {
    this.source = 'response_status';
    this.comparison = 'equal_number';
    this.value = 200;
}

module.exports = Assertion;
