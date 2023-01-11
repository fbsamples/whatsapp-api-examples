/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const express = require('express');
const bodyParser = require('body-parser');
const express = require('express');
const xhub = require('express-x-hub');
const { sendWhatsAppMessage } = require('./messageHelper');
const chatbot = require('./chatbot')

const app = express()
const port = 3000

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

var token = process.env.TOKEN || 'token';

app.get('/hello', function(req, res) {
  console.log(`Received get request ${hub.mode}`);
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/hello', async function(req, res, next) {

  const entries = req.body.entry.map(async (entry)=>{
    const changes = entry.changes.map(async (change)=>{
      if (!change.value.messages) {
        res.sendStatus(200);
        return;
      }

      const messages = change.value.messages.map(async (message)=>{
        if (message.type == 'text') {

          console.log( `New text message: ${JSON.stringify(message.text.body)}`);

          try {
            const result = await chatbot.textQuery(message.text.body)

            let botResponse = '';

            if (result.sessionState
              && result.sessionState.intent
              && result.sessionState.intent.state
              && result.sessionState.intent.state === 'ReadyForFulfillment') {
              botResponse = 'Thank you. Your reservation went through successfully!'
            }
            else {
              if (result.messages) {
                result.messages.forEach(async resultMessage => {
                  if (botResponse.length > 0) {
                    botResponse = botResponse + '\r\n'
                  }
                  botResponse = botResponse + resultMessage.content
                });
              }
            }

            console.log(`Chatbot response: ${botResponse}`);

            await sendWhatsAppMessage(botResponse);
            res.sendStatus(200)
            return;
          } catch (error) {
            console.log(error);
            res.sendStatus(500);
          }
        }
      })
    })
  })

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app
