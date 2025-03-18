import {Inject, Injectable} from "@nestjs/common";
import {PrismaService} from "@org/prisma";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {CreateMemoryDto, Memory} from "@org/models";

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
      this.logger.log("info", "ℹ️ Memory service: Récupération de toutes les memories");
      const memories = await this.prisma.memory.findMany({
        include: {
          friends: {
            include: {
              friend: true,
            },
          },
        },
      });

      return memories.map(memory => ({
        id: memory.id,
        images: memory.images,
        title: memory.title,
        description: memory.description,
        place: memory.place,
        date: memory.date,
        friends: memory.friends.map(f => f.friend),
      }));
    } catch (error) {
      this.logger.error("error", "🚨 Memory service: Une erreur est survenu lors de la récupération de toutes les memories : " + error);
      return false;
    }
  }

  /* Mutation */
  async createMemory(data: CreateMemoryDto): Promise<Memory | boolean> {
    try {
      this.logger.log("info", "ℹ️ Memory service: Création d'une memory");

      const {friendIds, ...memoryData} = data;

      const memory = await this.prisma.memory.create({
        data: {
          ...memoryData,
          friends: {
            create: friendIds?.map(friendId => ({
              friend: {
                connect: {
                  id: friendId,
                },
              },
            })) || [],
          },
        },
        include: {
          friends: {
            include: {
              friend: true,
            },
          },
        },
      });

      // Transformation pour correspondre au type Memory
      return {
        id: memory.id,
        images: memory.images,
        title: memory.title,
        description: memory.description,
        place: memory.place,
        date: memory.date,
        friends: memory.friends.map(f => f.friend),
      };
    } catch (error) {
      this.logger.error("error", "🚨 Memory service: Une erreur est survenu lors de la création d'une memory : " + error);
      return false;
    }
  }
}
