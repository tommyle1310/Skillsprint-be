import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionsResolver } from './transactions.resolver';

@Module({
  imports: [PrismaModule],
  providers: [TransactionsResolver],
})
export class TransactionsModule {}


