import * as restify from 'restify'
import { environment } from '../commom/environment'
import { Router } from '../commom/router'
import * as mongoose from 'mongoose'

export class Server {

    application: restify.Server

    initializeDb(): mongoose.MongooseThenable{
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url,{ 
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser());//passe dos parametros de url
                this.application.use(restify.plugins.bodyParser());//transforma em json para que possa entrar no req
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() => 
        this.initRoutes(routers).then(() => this))
    }
}