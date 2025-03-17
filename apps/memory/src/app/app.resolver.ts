import {AppService} from "./app.service";
import {Query, Resolver} from "@nestjs/graphql";
import {Memory, User} from "@org/models";

@Resolver(() => User)
export class AppResolver {
  constructor(
    private readonly appService: AppService,
  ) {}

  /* Memory */

  /* Query */

  @Query(() => [Memory])
  getMemories(): Promise<Memory[] | boolean> {
    return this.appService.getMemories();
  }
}
