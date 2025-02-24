import {Query, Resolver} from "@nestjs/graphql";
import {AppService} from "./app.service";

@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query()
  getData(): { message: string } {
    return this.appService.getData();
  }
}
