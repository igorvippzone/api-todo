const express = require("express");
const router = express.Router();
const { Todo } = require("./models");
const ip = require("ip");

// const fetch = require("node-fetch");
// const https = require("https");

const axios = require("axios");

router.post("/recognition/callback/qr", (req, res) => {
  console.log("qr: ", req);
});

router.get("/setQRCodeCallback/:ip", (req, res) => {
  const { ip: deviceIp } = req.params;
  const serverIp = ip.address();

  const query = `pass=1&callbackUrl=http://${serverIp}:3000`;

  axios
    .post(
      `http://${deviceIp}:8090/setQRCodeCallback?${query}/api/device/recognition/callback/qr`
    )
    .then((result) => console.log("qr-post ", result.data));
});

router.post("/recognition/callback", (req, res) => {
  console.log(req.body);
});

router.get("/setIdentifyCallBack/:ip", (req, res) => {
  const { ip: deviceIp } = req.params;
  const serverIp = ip.address();

  const query = `pass=1&callbackUrl=http://${serverIp}:3000`;

  axios
    .post(
      `http://${deviceIp}:8090/setIdentifyCallBack?${query}/api/device/recognition/callback`
    )
    .then((res) => console.log("card-post: ", res.data));
});

module.exports = router;
