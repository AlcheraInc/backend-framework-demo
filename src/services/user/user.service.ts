// user.service.ts
import { Application } from '@feathersjs/express';
import { User} from '../../models';
import { hashName } from './user.hook';
import { ArticleService } from '../article/article.service';

interface UserData {
    id?: number;
    email: string;
}

class UserService {
    async find() {
        return User.findAll();
    }

    async get(id: number | string) {
        return User.findByPk(id);
    }

    async create(data: UserData) {
        return User.create(data);
    }

    async update(id: number | string, data: UserData) {
        await User.update(data, { where: { id } });
        return User.findByPk(id);
    }

    async patch(id: number | string, data: UserData) {
        await User.update(data, { where: { id } });
        return User.findByPk(id);
    }

    async remove(id: number | string) {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return user;
        }
        throw new Error('User not found');
    }
}

export default (app: Application): void => {
    // Initialize our service with any options it requires
    app.use('/users', new UserService());

    // Get our initialized service so that we can register hooks
    const userService = app.service('users');

    userService.hooks({
        before: {
            update: [hashName],
            patch: [hashName]
        }
    });

    app.use('/users/:user_id/articles', new ArticleService())
};
