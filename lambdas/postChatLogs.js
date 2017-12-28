'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-southeast-1'
});

/**
/ To invoke this function via AWS API gateway:
/ 1. Upload as a lambda function
/ 2. Create a GET method trigger to this lambda function in API gateway
/ 3. Enable CORS for the GET method in API gateway
/ 4. Publish

/ 5. Create dynamoDB table called 'chat-table' with primary key of type
/ number and name 'id'. Currently pulls this element from the table:
/ {
  id: 0
  logs : ['first', 'second', 'third']
}
*/

exports.handler = (event, context, callback) => {
  let jsonWrapper = {
    logs: ['Hi', 'Hello', 'Kiaora']
  }

  console.log("Running post from database");

  let getParameters = {
    TableName: 'chat-table',
    Key: {
      // id: parseInt(event.id)
      id: 0
    }
  };

  docClient.get(getParameters, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      updateChatLog(data.Item, 'test', callback);
    }
  });
};

function updateChatLog(oldItem, message, callback) {

  var newChatLogs = oldItem.logs;
  newChatLogs.push(message);

  var updatedItem = {
    id: oldItem.id,
    logs: newChatLogs
  };

  //Write the results back to the database
  var writeParams = {
    Item: updatedItem,
    TableName: 'chat-table'
  };

  docClient.put(writeParams, function(err, data) {
    if (err) {
      callback(err, null);
    } else {

      //To get around cors, need a response header
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Credentials': true,
        },
        body: {logs: updatedItem.logs}
      };
      callback(null, response);
    }
  });
}
