# node-runscope

A promise-based library for interacting with the Runscope.

Designed to conform to the structure of the Runscope REST API.

Suggested Usage: https://github.com/louishawkins/node-runscope/blob/master/example.js.

See Runscope API documentation for specific parameters: 
https://www.runscope.com/docs/api

### Get Started
```javascript
  var runscope = require('runscope')(YOUR_RUNSCOPE_TOKEN);
```

### Methods

#### List Buckets
```javascript
  runscope.bucketList();
```
#### Create Bucket
```javascript
  runscope.createBucket(opts);
```

#### Account Info
```javascript
  runscope.account();
```
#### Available Service Regions
```javascript
  runscope.regions();
```

### Bucket Methods
```javascript
  var myBucket = runscope.bucket(YOUR_BUCKET_KEY);
```
#### Bucket Details
```javascript
  myBucket.detail();
```
#### List Tests
```javascript
  myBucket.listTests();
```
#### Find Test By Name
```javascript
  myBucket.findTestByName('My Test').then(function (myTest) {
      // myTest object has access to all methods
      // outlined under "Test Methods" below.
      myTest.trigger();
  }
```

#### Messages API (Traffic Inspector) Methods

A Message for the purposes of this API represents an HTTP request and response pair. Each message can contain a request, a response, or both (most common).

```javascript
    var opts = {
        count: 50, //int
        since: new Date(), //timestamp
        before: new Date(), //timestamp
    }
    // retrieve all messages
    myBucket.messages(opts);
    // retrieve all errors
    myBucket.errors(opts);
    //retrive shared
    myBucket.shared(opts);
    //retrieve captures
    myBucket.captures(opts);
```

### Test Methods
#### List Tests
```javascript
  var myBucketTests = myBucket.tests;
  myBucketTests.list();
```

#### Create Test
```javascript
  var opts = {
      name: 'Test Name',
      description: 'This is a description of the test'
  }

  myBucketTests.create(opts).then(function (newTest) {
      // newTest is a new Test object
      
      var requestOpts = {
          method: 'GET',
          url: 'http://www.google.com'
      }
      newTest
          .addRequest(requestOpts)
          .then(newTest.trigger())
          .then(done);
  }).catch(function (error) {
    //error
  }
```

#### Get Test Details
```javascript
  myTest = myBucket.test(TEST_ID);
  myTest.detail();
```

#### Trigger Test
```javascript
  myTest.trigger();
  
  // results are usually available 
  // after 2 seconds
  myTest
    .trigger()
    .delay(2000)
    .then(function () {
        return myTest.results.latest();
    })
    .then(function (results) {
        console.log(results);
    })
    .catch(function (err) {
      throw new Error(err);
    }
```

#### Update Test
```javascript
  myTest.update(opts);
```

#### Delete Test
```javascript
  myTest.delete();
```

## Test Resources

The `Tests` object contains four resources:
```javascript
  Tests.environments
  Tests.results
  Tests.schedules
  Tests.steps
```

### Tests.steps

#### Add Step 
```javascript
  // step type will default to "request"
  myTest.steps.add(opts);
  
  // more expressively
  myTest.steps.addRequest(opts);
  
  //chain as many as you want
  // Note: currently step order is not guaranteed.
  // See: https://github.com/louishawkins/node-runscope/issues/1
  myTest.steps
    .addRequest(STEP_ONE)
    .addRequest(STEP_TWO)
    .add(STEP_n)
    .then(doStuff)
    .catch();
  
  //other step types
  myTest.addPause({ duration: 2 /* seconds */});
  myTest.addCondition(opts);
  myTest.ghostInspector(opts); //yes even a ghost inspector step
```

#### Change Step Order
```javascript
  myTest.steps.changeOrder(opts);
```

#### Step Detail
```javascript
  myTest.steps.detail(STEP_ID);
```

#### Update Step
```javascript
  myTest.steps.update(STEP_ID, opts);
```

#### Delete Step
```javascript
  myTest.steps.delete(STEP_ID);
```

### Tests.schedules

#### Create Schedule
```javascript
  myTest.schedules.create(opts);
```

#### Modify Schedule
```javascript
  myTest.schedules.modify(SCHEDULE_ID, opts);
```

#### Show Schedule Details
```javascript
  myTest.schedules.detils(SCHEDULE_ID);
```

#### Delete (stop) a Schedule
```javascript
  myTest.schedules.delete(SCHEDULE_ID);
  //or
  myTest.schedules.stop(SCHEDULE_ID);
```

### Tests.results

#### Get Latest Test Result
```javascript
  myTest.results.latest();
```

#### List Test Runs
```javascript
  myTest.results.list();
```

#### Show Details for a Test Run
```javascript
  myTest.results.detail(TEST_RUN_ID);
```
### Tests.environments
```javascript
  myTest.environments.list();
  myTest.environments.create(opts);
  myTest.environments.modify(opts);
  myTest.environments.detail(ENV_ID);
  myTest.environments.delete(ENV_ID);
```

-------------------
### References

Bluebird: http://bluebirdjs.com/docs/api-reference.html


