import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [PrismaModule],
  providers: [OrdersResolver],
})
export class OrdersModule {}
