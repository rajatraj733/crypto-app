var express = require("express");


/*
import crypto = require("crypto");
import * as fs from "fs";
import properties = require("properties");
import * as queryString from "querystring";
import request = require("request");
import {RequestResponse} from "request";
import * as WebSocket from "ws";
import {RestTradeService} from "./services/trade.service";

let appKey;
let appSecret;

const baseRequest = request.defaults({
    baseUrl: "https://api.binance.com/api/",
});

export function startApp() {
    properties.parse("app.properties", {path: true}, (error, obj) => {
        if (error) {
            console.log(error);
        }
        console.dir(obj);
        appKey = obj["api-key"];
        appSecret = obj["api-secret"];
        callHttp();
    });

}

function callHttp() {
    const date: Date = new Date();
    console.log(date.getTime());
    const params = {
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
    const paramStr = queryString.stringify(params);
    console.log("paramStr: " + paramStr);
    const signature = crypto.createHmac("sha256", appSecret.toString()).update(paramStr).digest("hex");
    console.log("signature: " + signature);
    params.signature = signature;
    const options = {
        url: "https://api.binance.com/api/v3/order",
        headers: {
            "X-MBX-APIKEY": appKey,
        },
        method: "POST",
        qs: params,
    };
    request(options, (e, r: RequestResponse, b) => {
        console.dir(e);
        console.dir(r.body);
        console.dir(b);
    });
}

function getSignature(paramStr: String): String {
    return crypto.createHmac("sha256", appSecret.toString()).update(paramStr.toString()).digest("hex");
}

function checkServerTime() {
    console.log("local time: " + (new Date()).getTime());
    baseRequest("/v1/time", (e, r, b) => {
        console.log(e);
        console.dir(b);
    });
}

function getRecentTrades(symbol: string) {
    const options = {
        url: "/v1/trades",
        qs: {
            symbol,
        },
    };
    baseRequest(options, (e, r, b) => {
        console.log(e);
        // console.dir(b);
        fs.createWriteStream("result.json").write(b);
    });
}

// startApp();
// checkServerTime();

// getRecentTrades('ETHBTC');
const tradeService: RestTradeService = new RestTradeService();
tradeService.getRecentTrades("ETHBTC");

/!*const ws = new WebSocket("wss://stream.binance.com:9443/ws/bnbbtc@trade");

ws.on('message', (data) => {
    console.dir(data);
})

console.log('websocket message incoming');*!/
*/


