// user.service.ts
import {Application} from '@feathersjs/express';
import {User} from '../../models';
import {hashName} from './user.hook';
import articleRouter from "./article.router";

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
        await User.update(data, {where: {id}});
        return User.findByPk(id);
    }

    async patch(id: number | string, data: UserData) {
        await User.update(data, {where: {id}});
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
        },
        after: {
            all: [logging],
        }
    });

    app.use('/users/:userId/articles', articleRouter);
};

async function validateUserExistence(context: any) {
    const {params} = context;
    const userId = params.route.userId;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
}

async function logging(context: any) {
    const current_time = new Date();
    console.log(`Distributed Logging Hook - User ${current_time}`);
}