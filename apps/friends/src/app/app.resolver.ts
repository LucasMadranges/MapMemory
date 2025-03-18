import {AppService} from "./app.service";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CreateFriendsDto, Friends} from "@org/models";

@Resolver(() => Friends)
export class AppResolver {
  constructor(
    private readonly appService: AppService,
  ) {}

  /* Friends */

  /* Query */

  @Query(() => [Friends])
  getFriends(): Promise<Friends[] | boolean> {
    return this.appService.getFriends();
  }

  /* Mutation */

  @Mutation(() => Friends)
  createFriend(@Args("data") data: CreateFriendsDto): Promise<Friends | boolean> {
    return this.appService.createFriend(data);
  }
}
