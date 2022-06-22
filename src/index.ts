import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

// const body_parser = require("body-parser");
// const compression = require("compression");
// const cors = require("cors");

// const config_webserver = require(__base + "config").server;
// const MiddleWares = require(__base + "middlewares");


// // Main express app
// let app = express();

// // Middlewares and wrappers
// app.use(MiddleWares.jsonCallBack);
// if (config_webserver.cors) {
//     app.use(MiddleWares.crossOrigin);
//     app.use(cors({ origin: true }));
// }
// app.use(compression());
// app.use(body_parser.json({ limit: '100mb' }));
// app.use(body_parser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 1000000 }));
// app.enable("trust proxy");

// // API modules inclusion
// app.use("/upload_data", require(__base + "api/upload"));
