// Initialize our service with any options it requires
import {hashName} from "./user.hook";
import userArticleRouter from "./user-article.router";
import {Router} from 'express';
import {Application} from "@feathersjs/express";

async function logging(context: any) {
    const current_time = new Date();
    console.log(`Distributed Logging Hook - User ${current_time}`);
}

const userRouter = Router();

export default (app: Application): Router => {
    const userService = app.service('users');

    userService.hooks({
        before: {
            update: [hashName],
            patch: [hashName]
        },
        after: {
            all: [logging],
        }
    });

    app.use('/users/:userId/articles', userArticleRouter);

    return userRouter;
};