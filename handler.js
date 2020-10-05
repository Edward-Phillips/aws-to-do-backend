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

module.exports.getOne = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Note.findById(event.pathParameters.id)
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
					body: 'Could not fetch the note.'
				})
			);
	});
};

module.exports.getAll = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Note.find()
			.then(notes =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(notes)
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not fetch the notes.'
				})
			);
	});
};

module.exports.update = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
			new: true
		})
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
					body: 'Could not fetch the notes.'
				})
			);
	});
};
