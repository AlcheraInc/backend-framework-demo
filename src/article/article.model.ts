import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface ArticleAttributes {
    id: number;
    title: string;
    userId: number;
}

interface ArticleCreationAttributes extends Optional<ArticleAttributes, 'id'> {}

class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
    public id!: number;
    public title!: string;
    public userId!: number;
}

export default (sequelize: Sequelize): typeof Article => {
    Article.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        {
            tableName: 'articles',
            sequelize,
        }
    );

    return Article;
};