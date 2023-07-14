import { feathers } from '@feathersjs/feathers'
import express, {json, rest, urlencoded, errorHandler } from '@feathersjs/express'
import services from "./services";

const app = express(feathers())

app.use(errorHandler());

// Serve static files from the current directory
app.use(json());

app.use(urlencoded({ extended: true }))
// Set up REST transport
app.configure(rest())

// Register services
app.configure(services);

app.set('port', 3000);

export default app;
