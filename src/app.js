const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const { controllerHandler } = require('./util/controllerHandler');

class Application {
  constructor(express, modelInterface) {
    this.express = express;
    this.app = express();
    this.upControllers(modelInterface.models);
  }

  upControllers(models) {
    try {
      this.app.use(this.express.json());
      this.app.use(morgan('combined'));

      const dir = path.join(__dirname, 'controllers');
      const listControllers = fs.readdirSync(dir);

      listControllers.forEach((controllerFolder) => {
        const methods = fs
          .readdirSync(`${dir}\\${controllerFolder}`)
          .filter((file) => file !== 'rules.js');

        methods.forEach((controllerFile) => {
          const controller = require(`${dir}\\${controllerFolder}\\${controllerFile}`);

          // function signature: someExpressFunction (req, res, next) {}
          const someExpressFunction = controller.handler(models);

          // function signature: someControllerHandler (req, res, next) {}
          const someControllerHandler = controllerHandler(someExpressFunction);

          const requestSteps = controller.middlewares
            // .map((middleware) => middleware(models))
            .concat(someControllerHandler);

          /**
           * Adds the controller to the app instance
           * passing the request options
           * and defining the middleware that will be called
           * before the handler itself
           * */

          this.app[controller.method.toLowerCase()](
            controller.path,
            ...requestSteps,
          );
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = (express, models) => new Application(express, models).app;
