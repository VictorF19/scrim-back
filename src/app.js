const fs = require("fs");
const path = require("path");
const errorHandler = require("./util/errorHandler")
const morgan = require('morgan')

class Application {
  constructor(express, modelInterface) {
    this._express = express;
    this._app = express();
    this.upControllers(modelInterface.models, errorHandler);
  }

  upControllers(models, errorHandler) {
    this._app.use(this._express.json())
    this._app.use(morgan('combined'))

    const dir = path.join(__dirname, "controllers");
    const listControllers = fs.readdirSync(dir);

    listControllers.forEach((controllerFolder) => {

      const methods = fs.readdirSync(`${dir}\\${controllerFolder}`);

      methods.forEach(controllerFile => {
        const controller = require(`${dir}\\${controllerFolder}\\${controllerFile}`);

        const requestSteps = controller.middlewares
          .map((middleware) => middleware(models))
          .concat(controller.handler(models, errorHandler));

        /**
         * Adds the controller to the app instance
         * passing the request options
         * and defining the middleware that will be called
         * before the handler itself
         **/

        this._app[controller.method.toLowerCase()](
          controller.path,
          ...requestSteps
        );
      })

    });
  }
}

module.exports = (express, models) => new Application(express, models)._app;
