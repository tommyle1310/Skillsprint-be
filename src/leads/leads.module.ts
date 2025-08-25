import { Module } from '@nestjs/common';
import { LeadsResolver } from './leads.resolver';

@Module({
  providers: [LeadsResolver],
})
export class LeadsModule {}
