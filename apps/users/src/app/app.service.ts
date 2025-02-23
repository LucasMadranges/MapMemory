import {Injectable} from "@nestjs/common";
import {PrismaService} from "@org/prisma";
import {User} from "@org/models";
import {CreateUserDto} from "../../../../libs/models/src/schemas/users/create-user.dto";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.users.create({
      data,
    });
  }
}
