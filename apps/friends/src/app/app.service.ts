import {Inject, Injectable} from "@nestjs/common";
import {PrismaService} from "@org/prisma";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {CreateFriendsDto, Friends} from "@org/models";

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /* Users */

  /* Query */

  async getFriends(): Promise<Friends[] | boolean> {
    try {
      this.logger.log("info", "ℹ️ Friends service: Récupération de tous les friends");
      return this.prisma.friends.findMany();
    } catch (error) {
      this.logger.error("error", "🚨 Friends service: Une erreur est survenu lors de la récupération de tous les friends : " + error);
      return false;
    }
  }

  /* Mutation */
  async createFriend(data: CreateFriendsDto): Promise<Friends | boolean> {
    try {
      this.logger.log("info", "ℹ️ Friends service: Création d'un friend");
      return this.prisma.friends.create({
        data,
      });
    } catch (error) {
      this.logger.error("error", "🚨 Friends service: Une erreur est survenu lors de la création d'un friend : " + error);
      return false;
    }
  }
}
