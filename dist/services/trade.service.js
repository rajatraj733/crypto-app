"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var parser = require("properties-parser");
var RestTradeService = /** @class */ (function () {
    function RestTradeService() {
        this.baseRequest = request.defaults({
            baseUrl: "https://api.binance.com/api/",
        });
        this.propertiesFile = parser.read("app.properties");
        console.log(this.propertiesFile);
        this.API_KEY = this.propertiesFile["api-key"];
        this.API_SECRET = this.propertiesFile["api-secret"];
        // console.log(this.API_KEY+' '+this.API_SECRET);
    }
    RestTradeService.prototype.getRecentTrades = function (symbol) {
        var options = {
            url: "/v1/trades",
            qs: {
                symbol: symbol,
            },
        };
        this.baseRequest(options, function (e, r, b) {
            console.log(e);
            var trades = JSON.parse(b);
            console.dir(trades.length);
            // console.dir(b);
            // fs.createWriteStream('result.json').write(b);
        });
    };
    return RestTradeService;
}());
exports.RestTradeService = RestTradeService;
//# sourceMappingURL=trade.service.js.map