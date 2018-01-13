"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var fs = require("fs");
var properties = require("properties");
var queryString = require("querystring");
var request = require("request");
var trade_service_1 = require("./services/trade.service");
var appKey;
var appSecret;
var baseRequest = request.defaults({
    baseUrl: "https://api.binance.com/api/",
});
function startApp() {
    properties.parse("app.properties", { path: true }, function (error, obj) {
        if (error) {
            console.log(error);
        }
        console.dir(obj);
        appKey = obj["api-key"];
        appSecret = obj["api-secret"];
        callHttp();
    });
}
exports.startApp = startApp;
function callHttp() {
    var date = new Date();
    console.log(date.getTime());
    var params = {
        symbol: "LTCBTC",
        side: "BUY",
        type: "LIMIT",
        timeInForce: "GTC",
        quantity: "1",
        price: "0.1",
        recvWindow: "5000",
        timestamp: date.getTime(),
        signature: "",
    };
    var paramStr = queryString.stringify(params);
    console.log("paramStr: " + paramStr);
    var signature = crypto.createHmac("sha256", appSecret.toString()).update(paramStr).digest("hex");
    console.log("signature: " + signature);
    params.signature = signature;
    var options = {
        url: "https://api.binance.com/api/v3/order",
        headers: {
            "X-MBX-APIKEY": appKey,
        },
        method: "POST",
        qs: params,
    };
    request(options, function (e, r, b) {
        console.dir(e);
        console.dir(r.body);
        console.dir(b);
    });
}
function getSignature(paramStr) {
    return crypto.createHmac("sha256", appSecret.toString()).update(paramStr.toString()).digest("hex");
}
function checkServerTime() {
    console.log("local time: " + (new Date()).getTime());
    baseRequest("/v1/time", function (e, r, b) {
        console.log(e);
        console.dir(b);
    });
}
function getRecentTrades(symbol) {
    var options = {
        url: "/v1/trades",
        qs: {
            symbol: symbol,
        },
    };
    baseRequest(options, function (e, r, b) {
        console.log(e);
        // console.dir(b);
        fs.createWriteStream("result.json").write(b);
    });
}
// startApp();
// checkServerTime();
// getRecentTrades('ETHBTC');
var tradeService = new trade_service_1.RestTradeService();
tradeService.getRecentTrades("ETHBTC");
/*const ws = new WebSocket("wss://stream.binance.com:9443/ws/bnbbtc@trade");

ws.on('message', (data) => {
    console.dir(data);
})

console.log('websocket message incoming');*/
//# sourceMappingURL=index.js.map