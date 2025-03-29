import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@org/prisma';
import { CreateUserDto, LoginUserDto, UpdateUserDto, User } from '@org/models';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Bcrypt } from '@org/utils';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  /* Users */

  /* Query */

  async getUsers(): Promise<User[] | boolean> {
    try {
      this.logger.log(
        'info',
        'ℹ️ User service: Récupération de tous les utilisateurs'
      );
      return this.prisma.users.findMany();
    } catch (error) {
      this.logger.error(
        'error',
        '🚨 User service: Une erreur est survenu lors de la récupération de tous les utilisateurs: ' +
          error
      );
      return false;
    }
  }

  async getUserById(id: string): Promise<User | null | boolean> {
    try {
      this.logger.log(
        'info',
        "ℹ️ User service: Récupération de l'utilisateur avec l'id: " + id
      );
      return this.prisma.users.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(
        'error',
        "🚨 User service: Erreur lors de la récupération de l'utilisateur avec l'id: " +
          id +
          ': ' +
          error
      );
      return false;
    }
  }

  async getUserByEmail(email: string): Promise<User | null | boolean> {
    try {
      this.logger.log(
        'info',
        "ℹ️ User service: Récupération de l'utilisateur avec l'email: " + email
      );
      return this.prisma.users.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      this.logger.error(
        'error',
        "🚨 User service: Erreur lors de la récupération de l'utilisateur avec l'email: " +
          email +
          ': ' +
          error
      );
      return false;
    }
  }

  /* Mutation */

  async createUser(data: CreateUserDto): Promise<User | boolean> {
    try {
      this.logger.log('info', "ℹ️ User service: Création d'un utilisateur");

      const user = await this.getUserByEmail(data.email);

      if (user) {
        this.logger.log(
          'warn',
          '⚠️ Auth service: Tentative de création échouée - Utilisateur déjà existant'
        );
        return false;
      }

      const item: CreateUserDto = {
        avatar: data.avatar,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: await Bcrypt.hash(data.password),
      };

      return this.prisma.users.create({
        data: item,
      });
    } catch (error) {
      this.logger.log(
        'error',
        "🚨 User service: Erreur lors de la création d'un utilisateur: " + error
      );
      return false;
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User | boolean> {
    try {
      this.logger.log(
        'info',
        "ℹ️ User service: Modification de l'utilisateur: " + id
      );
      return this.prisma.users.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      this.logger.log(
        'error',
        "🚨 User service: Erreur lors de la modification de l'utilisateur: " +
          id +
          ': ' +
          error
      );
      return false;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      this.logger.log(
        'info',
        "ℹ️ User service: Suppression de l'utilisateur: " + id
      );
      const user = await this.getUserById(id);
      if (!user) return false;

      await this.prisma.users.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      this.logger.log(
        'error',
        "🚨 User service: Erreur lors de la suppression de l'utilisateur: " +
          id +
          ': ' +
          error
      );
      return false;
    }
  }

  /* Authentication */

  /* Query */

  async loginUser(login: LoginUserDto): Promise<User | boolean> {
    this.logger.log(
      'info',
      'ℹ️ Auth service: Tentative de connexion pour: ' + login.email
    );

    const user = await this.getUserByEmail(login.email);

    if (!user || typeof user === 'boolean') {
      this.logger.log(
        'warn',
        '⚠️ Auth service: Tentative de connexion échouée - Utilisateur non trouvé'
      );
      return false;
    }

    const verifPassword = await Bcrypt.compare(login.password, user.password);

    if (!verifPassword) {
      this.logger.log(
        'warn',
        '⚠️ Auth service: Tentative de connexion échouée - Le mot de passe est incorrect'
      );
      return false;
    }

    return user;
  }
}
