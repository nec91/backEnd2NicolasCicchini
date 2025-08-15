import initApp from "./app/app.js";
import { config } from "./config/config.js";
import { initMongoDBAtlas } from './db/index.js'

const app = initApp();

await initMongoDBAtlas()

const server = app.listen(config.PORT, () => {
  console.info(`Sever listen on http://localhost:${config.PORT}`);
});

server.on("error", (error) => {
  console.error(`Error en el servidor: ${error.message}`);
});