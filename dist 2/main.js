"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            port: 4001,
        },
    });
    await app.listen();
    console.log('Users service is listening on port 4001 🚀');
}
bootstrap();
//# sourceMappingURL=main.js.map