exports.handler = (event, context, callback) => {

  let jsonWrapper = {
    generatedNum: 10
  }

  var response = {
    "statusCode": 200,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true
    },
    "body": jsonWrapper
  }
  callback(null, response);
};
