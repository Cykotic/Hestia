const { APIKey } = require('../config.json');
const fetch = require('node-fetch');

class Util {
    constructor() {
        this.key = APIKey;
    }
    async requestAPI(address, port, time, method, pps) {
        await fetch('https://api.unlisted.to/tests/launch', {
            // APIkey: hRjW3RHrcpnQmj
            method: "POST",
            body: JSON.stringify({
                token: `${APIKey}`,
                target: `${address}`,
                port: `${port}`,
                duration: `${time}`,
                method: `${method}`,
                pps: `${pps}`
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(json));
    }
}
exports.default = Util;