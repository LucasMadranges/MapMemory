import {AppService} from "./app.service";
import {Query, Resolver} from "@nestjs/graphql";
import {User} from "@org/graphql";

@Resolver(() => User)
export class AppResolver {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }
}
