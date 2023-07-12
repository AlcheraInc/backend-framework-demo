import userService from './user/user.service';
import articleService from './article/article.service';

export default function(app) {
    app.configure(userService);
    app.configure(articleService);
}
