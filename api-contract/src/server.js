const process = require("dotenv").config();
let serverPort = process.parsed.API_SERVER_PORT;
const app = require("./app");

if (!serverPort) {
    serverPort = 3000;
}

app.listen(serverPort, () => console.log(`Server running on ${serverPort} port`));