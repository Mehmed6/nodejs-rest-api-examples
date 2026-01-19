import express from 'express';
import {createEndpoints, startService} from "./endpoints.mjs";

const app = express()

createEndpoints(app);

startService(app, 50501);
