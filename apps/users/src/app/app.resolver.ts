import {AppService} from "./app.service";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CreateUserDto, UpdateUserDto, User} from "@org/models";

@Resolver(() => User)
export class AppResolver {
  constructor(
    private readonly appService: AppService,
  ) {}

  /* Query */

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }

  @Query(() => User, {nullable: true})
  getUserById(@Args("id") id: string): Promise<User | null> {
    return this.appService.getUserById(id);
  }

  @Query(() => User, {nullable: true})
  getUserByEmail(@Args("email") email: string): Promise<User | null> {
    return this.appService.getUserByEmail(email);
  }

  /* Mutation */

  @Mutation(() => User)
  createUser(@Args("data") data: CreateUserDto): Promise<User> {
    return this.appService.createUser(data);
  }

  @Mutation(() => User)
  updateUser(
    @Args("id") id: string,
    @Args("data") data: UpdateUserDto,
  ): Promise<User> {
    return this.appService.updateUser(id, data);
  }
}
