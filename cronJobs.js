const cron = require('node-cron');
const express = require('express');
const globalService = require("./services/service");
app = express();
const service = globalService();

let client = undefined;

// Schedule tasks to be run on the server.
cron.schedule('0 3 * * *', async function() {
  console.log("cronJob executed!");
}, {scheduled: true, timezone: "Europe/Berlin"});

app.listen(3001);

function enableCronJobs(client_) {
    client = client_;
}

module.exports = enableCronJobs;