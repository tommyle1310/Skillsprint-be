import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { InquiriesResolver } from './inquiries.resolver';

@Module({
  imports: [PrismaModule],
  providers: [InquiriesResolver],
})
export class InquiriesModule {}
