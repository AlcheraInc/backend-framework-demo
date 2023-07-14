import {Application} from '@feathersjs/express';
import {Params} from '@feathersjs/feathers';
import {Article} from '../dbconfig';

interface ArticleData {
    id?: number;
    title: string;
}

export class ArticleService {
    async find(params: Params) {
        return Article.findAll({
            where: params.query,
        });
    }

    async get(id: number | string, params: Params) {
        return Article.findOne({
            where: { ...params.route, id },
        });
    }

    async create(data: ArticleData, params: Params) {
        return Article.create({
            ...data,
            ...params.route,
        });
    }

    async update(id: number | string, data: ArticleData, params: Params) {
        await Article.update(data, { where: { ...params.route, id } });
        return Article.findOne({ where: { ...params.route, id } });
    }

    async patch(id: number | string, data: ArticleData, params: Params) {
        await Article.update(data, { where: { ...params.route, id } });
        return Article.findOne({ where: { ...params.route, id } });
    }

    async remove(id: number | string, params: Params) {
        const article = await Article.findOne({ where: { ...params.route, id } });
        if (article) {
            await article.destroy();
            return article;
        }
        throw new Error('Article not found');
    }
}


export default (app: Application): void => {
    app.use('/articles', new ArticleService());
    const articleService = app.service('/articles');

    articleService.hooks({
        after: {
            all: [logging]
        }
    });
};

async function validateArticleExistence(context: any) {
    const {params} = context;
    const articleId = params.route.articleId;

    // Check if the user exists
    const article = await Article.findByPk(articleId);
    if (!article) {
        throw new Error('Article not found');
    }
}

async function logging(context: any) {
    const current_time = new Date();
    console.log(`Distributed Logging Hook - Article ${current_time}`);
}