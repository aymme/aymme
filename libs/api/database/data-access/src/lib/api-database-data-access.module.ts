import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class ApiDatabaseDataAccessModule {}
