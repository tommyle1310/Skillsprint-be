import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizzesResolver } from './quizzes.resolver';

@Module({
  imports: [PrismaModule],
  providers: [QuizzesResolver],
})
export class QuizzesModule {}
