import { Sequelize } from 'sequelize';
import userModel from './user/user.model';
import articleModel from './article/article.model';
import pictureModel from "./picture/picture.model";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
});

const User = userModel(sequelize);
const Article = articleModel(sequelize);
const Picture = pictureModel(sequelize);

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

Article.hasMany(Picture, {
    foreignKey: {
        name: 'articleId'
    }
});
Picture.belongsTo(Article, {
    foreignKey: {
        name: 'articleId'
    }
});


sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
});

export { User, Article, Picture };