# node-runscope

A promise-based library for interacting with the Runscope.

Designed to conform to the structure of the Runscope REST API.

See https://github.com/louishawkins/node-runscope/blob/master/example.js.

## Get Started
```javascript
  var runscope = require('runscope')(YOUR_RUNSCOPE_TOKEN);
```

## Methods

### List Buckets
```javascript
  runscope.bucketList();
```
### Create Bucket
```javascript
  runscope.createBucket(opts);
```

### Account Info
```javascript
  runscope.account();
```
### Available Service Regions
```javascript
  runscope.regions();
```

## Bucket Methods
```javascript
  var myBucket = runscope.bucket(YOUR_BUCKET_KEY);
```
### Bucket Details
```javascript
  myBucket.detail();
```
### List Tests
```javascript
  myBucket.listTests();
```
### Find Test By Name
```javascript
  myBucket.findTestByName('My Test').then(function (myTest) {
      // myTest object has access to all methods
      // outlined under "Test Methods" below.
      myTest.trigger();
  }
```

### Messages API (Traffic Inspector) Methods

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

## Test Methods
### List Tests
```javascript
  var myBucketTests = myBucket.tests;
  myBucketTests.list();
```

### Create Test
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

### Get Test Details
```javascript
  myTest = myBucket.test(TEST_ID);
  myTest.detail();
```

### Trigger Test
```javascript
  myTest.trigger();
```

### Update Test
```javascript
  myTest.update(opts);
```

### Delete Test
```javascript
  myTest.delete();
```
Bluebird: http://bluebirdjs.com/docs/api-reference.html

Runscope API: https://www.runscope.com/docs/api
