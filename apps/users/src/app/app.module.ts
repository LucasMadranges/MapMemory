import {Module} from "@nestjs/common";
import {AppResolver} from "./app.resolver";
import {AppService} from "./app.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {PrismaModule} from "@org/prisma";
import {WinstonModule} from "nest-winston";
import {loggerConfig} from "@org/utils";
import * as process from "node:process";
import {join} from "path";

interface ValidationError {
  field: string;
  errors: string[];
}

interface BadRequestError {
  statusCode: number;
  message: string;
  validationErrors: ValidationError[];
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), "schema.gql"),
      },
      sortSchema: true,
      playground: true,
      debug: process.env.NODE === "development",
      introspection: true,
      formatError: (error) => {
        const originalError = error.extensions?.originalError as BadRequestError;

        return {
          message: error.message,
          path: error.path,
          locations: error.locations,
          extensions: {
            code: "BAD_REQUEST",
            validationErrors: originalError?.validationErrors || [],
          },
        };
      },
    }),
    PrismaModule,
    WinstonModule.forRoot(loggerConfig),
  ],
  providers: [AppResolver, AppService],
})

export class AppModule {
}

