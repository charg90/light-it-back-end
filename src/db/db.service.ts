import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(DbService.name);
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
    }
  }
}
