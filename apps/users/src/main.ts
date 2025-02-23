import {BadRequestException, Logger, ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import helmet from "helmet";
import {AppModule} from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production",
  }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors) => {
        const errors = validationErrors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        throw new BadRequestException({
          statusCode: 400,
          message: "Validation failed",
          validationErrors: errors,
        });
      },
    }),
  );

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT_USER || 4001;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
