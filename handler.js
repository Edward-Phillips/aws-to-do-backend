'use strict';

module.exports.hello = async (event, context, callback) => {
  console.log('Hello World' + Object.keys(context));
  callback(null, 'Hello World');

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.create = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Note.create(JSON.parse(event.body))
			.then(note =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(note)
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not create the note.'
				})
			);
	});
};
