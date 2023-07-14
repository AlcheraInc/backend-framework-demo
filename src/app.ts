import { feathers } from '@feathersjs/feathers'
import express, {json, rest, urlencoded, errorHandler } from '@feathersjs/express'
import userRouter from "./user/user.router";
import userService from "./user/user.service";
import articleService from "./article/article.service";
import pictureService from "./picture/picture.service";
import {sequelize} from "./dbconfig";

const app = express(feathers())

app.use(errorHandler());

// Serve static files from the current directory
app.use(json());

app.use(urlencoded({ extended: true }))
// Set up REST transport
app.configure(rest())

// Register services
app.configure(userService);
app.configure(articleService);
app.configure(pictureService);

app.set('port', 3000);

app.use('/users', userRouter(app));

export default app;
