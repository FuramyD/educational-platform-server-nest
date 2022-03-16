import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { NotFoundExceptionFilter } from "./filters/not-found.filter";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useStaticAssets(join(__dirname, "..", "educational-platform"));
    app.useGlobalFilters(new NotFoundExceptionFilter());
    await app.listen(3000);
}
bootstrap();
