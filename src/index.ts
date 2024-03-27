import { getApp } from "src/app";
import { APP_PORT } from "./pkg/config";

const startServer = (): void => {
  try {
    const app = getApp();
    app.listen(APP_PORT, () => {
      console.log(`server started at http://localhost:${APP_PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
