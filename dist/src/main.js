"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    });
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`🚀 SkillSprint Backend running on port ${port}`);
    console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}
bootstrap();
//# sourceMappingURL=main.js.map