const { default: axios } = require("axios");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 9000;
const USERNAME = process.env.HUE_USERNAME;
const HUE_IP = process.env.HUE_IP;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/lights", (req, res) => {
  axios
    .get(`${HUE_IP}/${USERNAME}/lights`)
    .then(({ data }) => res.send(Object.values(data)));
});

app.get("/lights/:id", (req, res) => {
  axios
    .get(`${HUE_IP}/${USERNAME}/lights/${req.params.id}`)
    .then(({ data }) => res.send(data));
});

app.put("/lights/:id/toggle", (req, res) => {
  axios
    .put(`${HUE_IP}/${USERNAME}/lights/${req.params.id}/state`, {
      on: req.body.on,
    })
    .then(({ data }) => res.send(data));
});

app.put("/lights/:id/brightness", (req, res) => {
  axios
    .put(`${HUE_IP}/${USERNAME}/lights/${req.params.id}/state`, {
      bri: +req.body.brightness,
    })
    .then(({ data }) => res.send(data));
});

app.put("/lights/:id/hue", (req, res) => {
  axios
    .put(`${HUE_IP}/${USERNAME}/lights/${req.params.id}/state`, {
      hue: +req.body.hue,
    })
    .then(({ data }) => res.send(data));
});

app.listen(PORT, () => {
  process.stdout.write("\033c");
  console.log(
    `💡💡 ------ HUE API listening at http://localhost:${PORT} ------ 💡💡`
  );
});
