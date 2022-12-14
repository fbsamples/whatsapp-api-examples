const express = require("express");
const bodyParser = require("body-parser");
require("body-parser-xml")(bodyParser);
const fetch = require("node-fetch");

// import the config in the .env
require('dotenv').config()

const app = express();

app.use(bodyParser.json());
// parse xml and json
app.use(bodyParser.xml());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/outbound_message", (requset, response) => {
  const xml_data =
    requset.body["soapenv:Envelope"]["soapenv:Body"][0].notifications[0]
      .Notification[0].sObject[0];

  // Get user name and Phone Number
  const user = {
    Name: xml_data["sf:FirstName"][0],
    Phone_number: xml_data["sf:Phone"][0],
  };

  //send WhatsApp message
  const url = `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`;

  const options = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: user.Phone_number,
    type: "template",
    template: {
      name: "welcome",
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: user.Name,
            },
          ],
        },
      ],
    },
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: options ? JSON.stringify(options) : null,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  // send a response back to Salesforce
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <notificationsResponse xmlns="http://soap.sforce.com/2005/09/outbound">
      <Ack>true</Ack>
    </notificationsResponse>
  </soapenv:Body>
</soapenv:Envelope>`;

  response.header("Content-Type", "application/xml");
  return response.status(200).send(xml);
});

app.get("/webhook", (request, response) => {
  let mode = request.query["hub.mode"];
  let token = request.query["hub.verify_token"];
  let challenge = request.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFICATION_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      response.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      response.sendStatus(403);
    }
  }
});

app.post("/webhook", async (request, response) => {
  const body = request.body;

  if (body.entry[0].changes[0].value !== "messages") {
    // not from the messages webhook so dont process
    return response.sendStatus(400);
  }

  const msg_status = body.entry[0].changes[0].value.statuses[0].status;

  // create a record in Salesforce CRM
  const request_access = await fetch(
    `https://login.salesforce.com/services/oauth2/token`,
    {
      body: `grant_type=password&client_id=${process.env.SFDC_CONSUMER_KEY}&client_secret=${process.env.SFDC_CONSUMER_SECRET}&username=${process.env.SFDC_USERNAME}&password=${process.env.SFDC_PASSWORD}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": 300,
      },
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => data.access_token);

  const access_token = await request_access;

  if (msg_status == "read") {
    fetch(`${config.domain}/services/data/v55.0/sobjects/Account/`, {
      body: {
        Name: "WhatsApp User",
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => response.sendStatus(200))
      .catch((err) => response.sendStatus(400));
  } else {
    response.sendStatus(400);
  }
});

const port = process.env.LISTENER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
