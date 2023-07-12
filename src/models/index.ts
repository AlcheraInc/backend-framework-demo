import { Sequelize } from 'sequelize';
import userModel from './user.model';
import articleModel from './article.model';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
});

const User = userModel(sequelize);
const Article = articleModel(sequelize);

User.hasMany(Article, {
    foreignKey: {
        name: 'userId'
    }
});
Article.belongsTo(User, {
    foreignKey: {
        name: 'userId'
    }
});

sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
});

export { User, Article };
