import express from 'express';
import {createEndPoints, startService} from "./endpoints.mjs";

const app = express();

createEndPoints(app);

startService(app, 60600);


