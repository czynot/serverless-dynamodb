'use strict';

const uuid = require('uuid');
var DynamoDB = require('aws-sdk/clients/dynamodb');
const dynamoDb = new DynamoDB.DocumentClient();
const params = {
    TableName: 'todos'
}

module.exports.list = (event, context, callback) => {
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t fetch the todos'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        callback(null, response)
    });
    
}