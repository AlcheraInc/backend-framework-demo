import {Application} from '@feathersjs/express';
import {Params} from '@feathersjs/feathers';
import {Article, Picture, User} from '../../models';

interface PictureData {
    id?: number;
    title: string;
}

export class PictureService {
    async find(params: Params) {
        const { userId, articleId } = params?.route;
        return Picture.findAll({
            include: [
                {
                    model: Article,
                    where: { id: articleId },
                    include: [
                        {
                            model: User,
                            where: { id: userId }
                        }
                    ]
                }
            ]
        });
    }

    async get(id: number | string, params: Params) {
        const { articleId } = params.route;
        return Picture.findOne({
            where: { id },
            include: [
                {
                    model: Article,
                    where: { id: articleId },
                    include: [{ model: User }]
                }
            ]
        });
    }

    async create(data: PictureData, params: Params) {
        const { articleId } = params.route;
        return Picture.create({ ...data, articleId });
    }

    async update(id: number | string, data: PictureData, params: Params) {
        const { userId, articleId } = params.route;
        const where = { id, userId, articleId };
        await Picture.update(data, { where });
        return Picture.findOne({ where });
    }

    async patch(id: number | string, data: PictureData, params: Params) {
        const { userId, articleId } = params.route;
        const where = { id, userId, articleId };
        await Picture.update(data, { where });
        return Picture.findOne({ where });
    }

    async remove(id: number | string, params: Params) {
        const { userId, articleId } = params.route;
        const where = { id, userId, articleId };
        const picture = await Picture.findOne({ where });
        if (picture) {
            await picture.destroy();
            return picture;
        }
        throw new Error('Picture not found');
    }
}

export default (app: Application): void => {
    //const pictureService = new PictureService();
    //app.use('/users/:userId/articles/:articleId/pictures', pictureService);
};
