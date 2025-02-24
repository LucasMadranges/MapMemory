import {Module} from "@nestjs/common";
import {AppService} from "./app.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloGatewayDriver, ApolloGatewayDriverConfig} from "@nestjs/apollo";
import {IntrospectAndCompose} from "@apollo/gateway";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        csrfPrevention: false,
        debug: process.env.NODE === "development",
        nodeEnv: process.env.NODE,
        introspection: true,
        playground: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {name: "users", url: `http://localhost:${process.env.PORT_USER}/graphql`},
          ],
          pollIntervalInMs: 1000,
        }),
      },
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}
