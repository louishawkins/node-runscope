var config = {
    token: 'cc78fcb4-c076-4b1b-a3f5-fded8d71d234',
    bucketKey: 'nwfqdpse77r5'
};

var runscope = require('./index.js')(config.token);
//assign .bucket to work within a particular bucket
var dashboardBucket = runscope.bucket(config.bucketKey);
//assign .tests to work with bucket tests
var dashboardTests = dashboardBucket.tests;

//create a test in a bucket
dashboardTests.create({
    name: 'Example Test',
    description: 'An example test created with library.'
}).then(function (newTest) {
    //returns a new test object which has test methods
    // Now we can add steps
    // steps can be added in a chain
    newTest.steps.addRequest({
            method: 'get',
            url: 'http://www.google.com',
            assert: 'status === 200'
        }).addPause({
            duration: 2
        }).addRequest({
            method: 'get',
            url: 'http://www.yahoo.com',
            assert: 'status === 200'
        }).then(function () {
            console.log('added all the requests!');
            newTest.schedules.create({
                environment_id: newTest.data.default_environment_id,
                interval: '1h',
                note: 'A schedule created through api'
            }).then(function () {
                newTest.trigger().then(allDone);
            });
        })
}).catch(function (err) {
    console.log(err);
});

function allDone () {
    console.log('Completely finished!');
}
