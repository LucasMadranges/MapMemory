import {Inject, Injectable} from "@nestjs/common";
import {PrismaService} from "@org/prisma";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {memory} from "@prisma/client";

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /* Users */

  /* Query */

  async getMemorys(): Promise<memory[] | boolean> {
    try {
      this.logger.log("info", "ℹ️ User service: Récupération de tous les utilisateurs");
      return this.prisma.memory.findMany();
    } catch (error) {
      this.logger.error("error", "🚨 User service: Une erreur est survenu lors de la récupération de tous les utilisateurs: " + error);
      return false;
    }
  }
}
