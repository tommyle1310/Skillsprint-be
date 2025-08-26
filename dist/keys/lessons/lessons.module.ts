import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LessonsResolver } from './lessons.resolver';

@Module({
  imports: [PrismaModule],
  providers: [LessonsResolver],
})
export class LessonsModule {}
