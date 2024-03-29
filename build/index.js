"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("src/app");
const config_1 = require("./pkg/config");
const startServer = () => {
    try {
        const app = (0, app_1.getApp)();
        app.listen(config_1.APP_PORT, () => {
            console.log(`server started at http://localhost:${config_1.APP_PORT}`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
startServer();
//# sourceMappingURL=index.js.map