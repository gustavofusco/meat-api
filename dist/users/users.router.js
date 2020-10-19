"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const router_1 = require("../commom/router");
const users_model_1 = require("../users/users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, res, next) => {
            users_model_1.User.find().then(users => {
                res.json(users);
                return next();
            });
        });
        application.get('/users/:id', (req, res, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    res.json(user);
                    return next();
                }
                res.send(404);
                return next();
            });
        });
        application.post('/users', (req, res, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(user => {
                res.json(user);
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
