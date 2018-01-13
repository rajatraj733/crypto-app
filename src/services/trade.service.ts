
import * as request from "request";

// import parser = require('properties-parser');
// import * as parser from "properties-parser";
import * as fs from "fs";

import parser = require("properties-parser");
import {Trade} from "../entities/trade";

export class RestTradeService {
    public baseRequest;
    public API_KEY;
    public API_SECRET;
    public propertiesFile;

    constructor() {
        this.baseRequest = request.defaults({
            baseUrl: "https://api.binance.com/api/",
        });
        this.propertiesFile = parser.read("app.properties");
        console.log(this.propertiesFile);
        this.API_KEY = this.propertiesFile["api-key"];
        this.API_SECRET = this.propertiesFile["api-secret"];
        // console.log(this.API_KEY+' '+this.API_SECRET);
    }

    public getRecentTrades(symbol: string) {
        const options = {
            url: "/v1/trades",
            qs: {
                symbol,
            },
        };
        this.baseRequest(options, (e, r, b) => {
            console.log(e);
            const trades = JSON.parse(b) as Trade[];
            console.dir(trades.length);
            // console.dir(b);
            // fs.createWriteStream('result.json').write(b);
        });
    }

}
