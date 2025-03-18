import {AppService} from "./app.service";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CreateMemoryDto, Memory} from "@org/models";

@Resolver(() => Memory)
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

  /* Mutation */
  @Mutation(() => Memory)
  createFriend(@Args("data") data: CreateMemoryDto): Promise<Memory | boolean> {
    return this.appService.createMemory(data);
  }
}
