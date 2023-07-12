import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { Article } from '../../models';

interface ArticleData {
    id?: number;
    title: string;
}

export class ArticleService {
    async find(params: Params) {
        const { user_id } = params?.route;
        console.log(params);
        console.log(user_id);
        return Article.findAll({ where: { userId: user_id } });
    }

    async get(id: number | string) {
        return Article.findByPk(id);
    }

    async create(params: Params, data: any) {
        const { user_id } = params?.route;
        console.log(data);
        //console.log(articleData);
        if (typeof user_id === 'undefined') {
            throw new Error('Invalid user ID');
        }

        return Article.create({
            ...data,
            userId: user_id
        });
    }

    async update(id: number | string, data: any) {
        await Article.update(data, { where: { id } });
        return Article.findByPk(id);
    }

    async patch(id: number | string, data: any) {
        await Article.update(data, { where: { id } });
        return Article.findByPk(id);
    }

    async remove(id: number | string) {
        const article = await Article.findByPk(id);
        if (article) {
            await article.destroy();
            return article;
        }
        throw new Error('Article not found');
    }
}

export default (app: Application): void => {
    //app.use('/users/:user_id/articles', new ArticleService());
};
