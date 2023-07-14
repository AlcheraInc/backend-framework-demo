import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface PictureAttributes {
    id: number;
    tag: string;
    articleId: number;
}

interface PictureCreationAttributes extends Optional<PictureAttributes, 'id'> {}

class Picture extends Model<PictureAttributes, PictureCreationAttributes> implements PictureAttributes {
    public id!: number;
    public tag!: string;
    public articleId!: number;
}

export default (sequelize: Sequelize): typeof Picture => {
    Picture.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            tag: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            articleId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        {
            tableName: 'pictures',
            sequelize,
        }
    );

    return Picture;
};