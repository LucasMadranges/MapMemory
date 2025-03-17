import {AppService} from "./app.service";
import {Query, Resolver} from "@nestjs/graphql";
import {User} from "@org/models";

@Resolver(() => User)
export class AppResolver {
  constructor(
    private readonly appService: AppService,
  ) {}

  /* User */

  /* Query */

  @Query(() => [User])
  getMemorys(): Promise<User[] | boolean> {
    return this.appService.getMemorys();
  }
}
