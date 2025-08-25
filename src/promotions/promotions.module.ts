import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PromotionsResolver } from './promotions.resolver';

@Module({
  imports: [PrismaModule],
  providers: [PromotionsResolver],
})
export class PromotionsModule {}


