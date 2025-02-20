import {Module} from "@nestjs/common";
import {AppResolver} from "./app.resolver";
import {AppService} from "./app.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {PrismaModule} from "@org/prisma";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    PrismaModule,
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {
}
