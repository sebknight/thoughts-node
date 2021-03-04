'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const sanitizer = require('sanitize');

module.exports = (event, callback) => {
  const sanitizeData = sanitizer(event.body);
  const data = JSON.parse(sanitizeData);

  data.id = uuid.v1();
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'thoughts',
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, params.Item);
  });
};