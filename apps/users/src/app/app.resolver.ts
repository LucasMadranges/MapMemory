import {AppService} from "./app.service";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CreateUserDto, LoginUserDto, UpdateUserDto, User} from "@org/models";

@Resolver(() => User)
export class AppResolver {
  constructor(
    private readonly appService: AppService,
  ) {}

  /* User */

  /* Query */

  @Query(() => [User])
  getUsers(): Promise<User[] | boolean> {
    return this.appService.getUsers();
  }

  @Query(() => User, {nullable: true})
  getUserById(@Args("id") id: string): Promise<User | null | boolean> {
    return this.appService.getUserById(id);
  }

  @Query(() => User, {nullable: true})
  getUserByEmail(@Args("email") email: string): Promise<User | null | boolean> {
    return this.appService.getUserByEmail(email);
  }

  /* Mutation */

  @Mutation(() => User)
  createUser(@Args("data") data: CreateUserDto): Promise<User | boolean> {
    return this.appService.createUser(data);
  }

  @Mutation(() => User)
  updateUser(
    @Args("id") id: string,
    @Args("data") data: UpdateUserDto,
  ): Promise<User | boolean> {
    return this.appService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args("id") id: string): Promise<boolean> {
    return this.appService.deleteUser(id);
  }

  /* Authentication */

  /* Query */

  @Query(() => User, {nullable: true})
  loginUser(
    @Args("data", {type: () => LoginUserDto})
    loginData: LoginUserDto,
  ): Promise<User | boolean> {
    return this.appService.loginUser(loginData);
  }
}
