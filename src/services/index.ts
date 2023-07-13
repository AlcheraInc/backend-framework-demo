import userService from './user/user.service';
import articleService from './article/article.service';
import pictureService from "./picture/picture.service";

export default function(app) {
    app.configure(userService);
    app.configure(articleService);
    app.configure(pictureService);
}
