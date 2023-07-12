import { feathers } from '@feathersjs/feathers';
import services from "./services";
import { koa, rest, bodyParser, errorHandler, serveStatic } from '@feathersjs/koa'


type ServiceTypes = {
    services
}

const app = koa<ServiceTypes>(feathers())

// Use the current folder for static file hosting
app.use(serveStatic('.'))
// Register the error handle
app.use(errorHandler())
// Parse JSON request bodies
app.use(bodyParser())

// Register REST service handler
app.configure(rest())

app.configure(services);

export default app;