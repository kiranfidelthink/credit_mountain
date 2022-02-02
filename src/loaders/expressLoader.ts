import { Application } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { createExpressServer, } from 'routing-controllers';
import { env } from '../../env';
import session from 'express-session';

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        // app.use() // you can configure it the way you want
        const expressApp: Application = createExpressServer({
            cors: true,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            // register created express server in routing-controllers
            controllers: env.app.dirs.controllers,
            middlewares: env.app.dirs.middlewares,
            // and configure it the way you need (controllers, validation, etc.)
            // middlewares: []
        });

        expressApp.use(session({
            resave: false,
            saveUninitialized: true,
            secret: 'SECRET'
        }));

        if (!env.isTest) {
            const server = expressApp.listen(env.app.port);
            settings.setData('express_server', server);
        }

        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);

        // creates express app, registers all controller routes and returns you express app instance

    }
}
