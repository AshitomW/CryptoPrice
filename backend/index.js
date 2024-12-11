require("dotenv").config();
const express = require("express");
const socketIO = require("socket.io");
const axios = require("axios");
const INTERVAL = 5000;

const app = express();
app.use(express.json());
//

const PORT = process.env.PORT || 3000;
//
const server = app.listen(PORT, function () {
  console.log(`Listening to port:${PORT}`);
});

const socketHandler = socketIO(server);

socketHandler.on("connection", function (socket) {
  console.log("Client Connected");

  socket.on("connect_error", function () {
    console.log("Client Error");
  });
  socket.on("disconnect", function () {
    console.log("client disconnected");
  });
});

const getPrices = () => {
  axios
    .get(process.env.BASE_URL + process.env.LIST_URL, {
      headers: {
        "x-messari-api-key": process.env.API_KEY,
      },
    })
    .then(function (response) {
      const priceList = response.data.data.map((item) => {
        return {
          id: item.id,
          name: item.slug,
          symbol: item.symbol,
          price: item.metrics.market_data.price_usd,
        };
      });

      socketHandler.emit("crypto", priceList);
    })
    .catch(function (error) {
      console.log(error);
      socketHandler.emit("crypto", {
        error: true,
        message: "Error Fetching Prices",
      });
    });
};

setInterval(() => {
  getPrices();
}, INTERVAL);

app.get("/cryptos/profile/", function (request, response) {
  response.json({
    error: "Missing Crypto ID",
  });
});
app.get("/cryptos/profile/:id", function (request, response) {
  const cryptoID = request.params.id;

  axios
    .get(process.env.BASE_URL + "/" + cryptoID + process.env.PROFILE_URL, {
      headers: {
        "x-messari-api-key": process.env.API_KEY,
      },
    })
    .then(function (responseData) {
      response.json(responseData.data.data);
    })
    .catch(function (error) {
      response.json({
        error: true,
        message: "Error Fetching Prices",
        errorDetails: error,
      });
    });
});

app.get("/cryptos/market-data/", function (request, response) {
  response.json({
    error: "Missing Crypto ID",
  });
});
app.get("/cryptos/market-data/:id", function (request, response) {
  const cryptoID = request.params.id;

  axios
    .get(process.env.BASE_URL_V1 + "/" + cryptoID + process.env.MARKET_URL, {
      headers: {
        "x-messari-api-key": process.env.API_KEY,
      },
    })
    .then(function (responseData) {
      response.json(responseData.data.data);
    })
    .catch(function (error) {
      response.json({
        error: true,
        message: "Error Fetching Prices",
        errorDetails: error,
      });
    });
});
