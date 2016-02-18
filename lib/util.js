var _ = require('underscore'),
    Promise = require('bluebird');

/**
 *  Accepts a promise as a parameter.
 *  The context must also be a promise
 *
 *  Returns a new promise which, when resolved, will resolve the
 *  context followed by the input promise.
 *
 *  Extends this new promise with the context.
 *
 * @param headPromise
 * @returns a new promise
 */

exports.chainablePromise = function (headPromise) {
    if (typeof headPromise.then !== 'function') {
        return headPromise;
    }

    if (this instanceof Promise) {
        var fulfillPrevious = this;
    }

    var q = new Promise(function(resolve, reject) {
        if (fulfillPrevious) {
            return fulfillPrevious.then(headPromise).then(resolve).catch(reject);
        } else {
            return headPromise.then(resolve, reject);
        }
    });

    return _.extend(q, this);
};