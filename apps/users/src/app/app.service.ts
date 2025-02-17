import {Injectable} from "@nestjs/common";
import {PrismaService} from "@org/prisma";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
