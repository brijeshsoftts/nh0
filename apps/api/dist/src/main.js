"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const config_1 = require("./config");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug', 'log'],
    });
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: config_1.env.CORS_ORIGIN,
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    const port = Number(config_1.env.PORT);
    const host = config_1.env.HOST_NAME;
    await app.listen(port, host);
    logger.log(`🚀 Application running on: ${await app.getUrl()}`);
    logger.log(`🌍 Environment: ${config_1.env.NODE_ENV}`);
}
bootstrap().catch((error) => {
    console.error('Error starting application:', error);
});
//# sourceMappingURL=main.js.map