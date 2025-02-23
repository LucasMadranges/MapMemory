import {Logger} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import helmet from "helmet";
import {AppModule} from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production",
  }));

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT_USER || 4001;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
