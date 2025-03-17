import {Inject, Injectable} from "@nestjs/common";
import {PrismaService} from "@org/prisma";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {Memory} from "@org/models";

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /* Users */

  /* Query */

  async getMemories(): Promise<Memory[] | boolean> {
    try {
      this.logger.log("info", "ℹ️ User service: Récupération de tous les utilisateurs");
      return this.prisma.memory.findMany({
        include: {
          friends: true,
        },
      });
    } catch (error) {
      this.logger.error("error", "🚨 Memory service: Une erreur est survenu lors de la récupération de toutes les memorys : " + error);
      return false;
    }
  }
}
