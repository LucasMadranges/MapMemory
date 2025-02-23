import {Injectable} from "@nestjs/common";
import {PrismaService} from "@org/prisma";
import {CreateUserDto, UpdateUserDto, User} from "@org/models";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  /* Query */

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

  /* Mutation */

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.users.create({
      data,
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.users.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.getUserById(id);
    if (!user) return false;

    await this.prisma.users.delete({
      where: {id},
    });

    return true;
  }
}
