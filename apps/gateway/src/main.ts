import {Logger} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import helmet from "helmet";
import {config} from "dotenv";

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "apollo-require-preflight"],
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: process.env.NODE === "production" ? {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      } : false,
    }),
  );

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = Number(process.env.PORT_GATEWAY);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
