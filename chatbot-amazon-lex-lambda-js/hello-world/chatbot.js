/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const { LexRuntimeV2Client, PutSessionCommand, RecognizeTextCommand } = require("@aws-sdk/client-lex-runtime-v2");

const userId = 'myUserId';

const textQuery = async (text) => {
  const client = new LexRuntimeV2Client({
    credentials: {
      accessKeyId: process.env.BOT_ACCESS_KEY_ID,
      secretAccessKey: process.env.BOT_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION
  });

  var sessionCommandOutput = null;

  try {

    sessionCommandOutput = new PutSessionCommand({
      botId: process.env.LEX_BOT_ID,
      botAliasId: process.env.LEX_BOT_ALIAS_ID,
      localeId: 'en_US',
      sessionId: 'sessionId'
    });
    console.log(JSON.stringify(sessionCommandOutput));
  }
  catch(error) {
    console.log(error);
    return error;
  }

  var recognizeTextCommandOutput = null

  try {

    recognizeTextCommandOutput = new RecognizeTextCommand({
      botId: process.env.LEX_BOT_ID,
      botAliasId: process.env.LEX_BOT_ALIAS_ID,
      userId: userId,
      text: text,
      localeId: 'en_US',
      sessionId: 'sessionId'
    })
    console.log(JSON.stringify(recognizeTextCommandOutput));
  }
  catch(error) {
    console.log(error);
    return error;
  }

  try {
    const response = await client.send(recognizeTextCommandOutput)
    console.log(JSON.stringify(response));
    return response
  }
  catch(error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  textQuery
}
