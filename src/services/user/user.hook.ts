// user.hooks.ts
import { Hook, HookContext } from '@feathersjs/feathers';
import bcrypt from 'bcrypt';

export const hashName: Hook = async (context: HookContext) => {
    const { data } = context;

    if (data.name) {
        const saltRounds = 10;
        data.name = await bcrypt.hash(data.name, saltRounds);
    }

    return context;
};
