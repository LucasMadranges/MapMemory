import {Module} from "@nestjs/common";
import {AppResolver} from "./app.resolver";
import {AppService} from "./app.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {PrismaModule} from "@org/prisma";

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
      },
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
  ],
  providers: [AppResolver, AppService],
})

export class AppModule {
}

