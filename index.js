const { default: axios } = require("axios");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const https = require("https");
require("dotenv").config();

const app = express();
const PORT = 9000;
const BASE_URL = `https://${process.env.HUE_BRIDGE_API}/clip/v2/resource`;

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const axiosInstance = axios.create({ baseURL: BASE_URL, httpsAgent });

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["hue-application-key"] = process.env.HUE_APPLICATION_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/lights", (req, res) => {
  axiosInstance.get(`${BASE_URL}/light`).then(({ data }) => res.send(data));
});

app.get("/rooms", (req, res) => {
  axiosInstance.get(`${BASE_URL}/room`).then(({ data }) => {
    res.send(data);
  });
});

app.get("/scenes", (req, res) => {
  axiosInstance.get(`${BASE_URL}/scene`).then(({ data }) => res.send(data));
});

app.get("/light/:id", (req, res) => {
  axiosInstance
    .get(`${BASE_URL}/light/${req.params.id}`)
    .then(({ data }) => res.send(data));
});

app.put("/light/:id/toggle", (req, res) => {
  axiosInstance
    .put(`${BASE_URL}/light/${req.params.id}`, { on: { on: req.body.on } })
    .then(({ data }) => res.send(data));
});

app.put("/light/:id/brightness", (req, res) => {
  axiosInstance
    .put(`${BASE_URL}/light/${req.params.id}`, {
      dimming: { brightness: req.body.brightness },
    })
    .then(({ data }) => res.send(data));
});

app.listen(PORT, () => {
  process.stdout.write("\033c");
  console.log(
    `💡💡 ------ HUE API listening at http://localhost:${PORT} ------ 💡💡`
  );
});
