/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const awsServerlessExpress = require('aws-serverless-express')
const app = require('./webHook')
const server = awsServerlessExpress.createServer(app)

exports.lambdaHandler = (event, context) => {
   awsServerlessExpress.proxy(server, event, context)
}
