import express from 'express';
import { Application } from '@feathersjs/express';

const router = express.Router({ mergeParams: true });

const getArticles = async (req, res, next) => {
    const { userId } = req.params;
    const app = req.app as Application;
    const articleService = app.service('articles');

    try {
        const articles = await articleService.find({
            query: {
                userId
            }
        });
        res.json(articles);
    } catch (error) {
        next(error);
    }
};

const createArticle = async (req, res, next) => {
    const { userId } = req.params;
    const app = req.app as Application;
    const articleService = app.service('articles');

    try {
        const createdArticle = await articleService.create(req.body, {route: {userId}});
        res.json(createdArticle);
    } catch (error) {
        next(error);
    }
};

// Apply the middleware to the router
router.get('/', getArticles);
router.post('/', express.json(), createArticle);

// More middleware for other HTTP methods...

export default router;
