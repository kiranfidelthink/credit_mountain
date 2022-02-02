import "reflect-metadata";
import { expressLoader } from './src/loaders/expressLoader';
import { bootstrapMicroframework } from "microframework";
import { winstonLoader } from "./src/loaders/winstonLoader";
import { iocLoader } from "./src/loaders/iocLoader";
import { banner } from './src/lib/banner';
import { Logger } from './src/lib/logger';
import { typeormLoader } from "./src/loaders/typeormLoader";
import { swaggerLoader } from "./src/loaders/swaggerLoader";

const log = new Logger(__filename);

bootstrapMicroframework({
  loaders: [
    iocLoader,
    winstonLoader,
    expressLoader,
    typeormLoader,
    swaggerLoader
  ]
})
  .then(() => {
    banner(log)
  })
  .catch(error => log.error('Application is crashed: ' + error));


