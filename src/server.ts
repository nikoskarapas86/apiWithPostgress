import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";
dotenv.config();
const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(express.json());

routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
