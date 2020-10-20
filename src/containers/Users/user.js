"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

exports.handler = async (event, context) => {
  const db = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "ap-south-1",
  });
  let responseBody = "";
  let statusCode = "";
  //const { id } = event.pathParameters;
  const { id, firstName, lastName } = JSON.parse(event.body);
  const params = {
    TableName: "Users",
    Item: {
      id,
      firstName,
      lastName,
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (err) {
    responseBody = "unable to put user";
    statusCode = 404;
  }
  const response = {
    statusCode,
    headers: {
      myHeader: "test",
    },
    body: responseBody,
  };
  return response;
};
