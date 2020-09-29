'use strict';

module.exports.hello = async (event, context, callback) => {
  console.log('Hello World');
  callback(null, 'Hello World');

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
