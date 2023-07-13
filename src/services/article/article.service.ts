import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import {Article, User} from '../../models';
import {PictureService} from "../picture/picture.service";

interface ArticleData {
    id?: number;
    title: string;
}

export class ArticleService {
    async find(params: Params) {
        const { userId } = params?.route;
        return Article.findAll({ where: { userId } });
    }

    async get(id: number | string, params: Params) {
        const { userId } = params.route;
        return Article.findOne({ where: { id, userId } });
    }

    async create(data: ArticleData, params: Params) {
        const { userId } = params.route;
        return Article.create({ ...data, userId });
    }

    async update(id: number | string, data: ArticleData, params: Params) {
        const { userId } = params.route;
        await Article.update(data, { where: { id, userId } });
        return Article.findOne({ where: { id, userId } });
    }

    async patch(id: number | string, data: ArticleData, params: Params) {
        const { userId } = params.route;
        await Article.update(data, { where: { id, userId } });
        return Article.findOne({ where: { id, userId } });
    }

    async remove(id: number | string, params: Params) {
        const { userId } = params.route;
        const article = await Article.findOne({ where: { id, userId } });
        if (article) {
            await article.destroy();
            return article;
        }
        throw new Error('Article not found');
    }
}

export default (app: Application): void => {
    //app.use('/users/:user_id/articles', new ArticleService());
    app.use('/users/:userId/articles/:articleId/pictures', new PictureService());
    const pictureService = app.service('/users/:userId/articles/:articleId/pictures');

    // Add a before hook for '/users/:userId/articles/:articleId/pictures' route
    pictureService.hooks({
        before: {
            all: [validateArticleExistence]
        }
    });
};

async function validateArticleExistence(context: any) {
    const { params } = context;
    const articleId = params.route.articleId;

    // Check if the user exists
    const article = await Article.findByPk(articleId);
    if (!article) {
        throw new Error('Article not found');
    }
}
