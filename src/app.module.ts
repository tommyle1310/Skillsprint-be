import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ProgressModule } from './progress/progress.module';
import { LeadsModule } from './leads/leads.module';
import { OrdersModule } from './orders/orders.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { PromotionsModule } from './promotions/promotions.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV !== 'production',
      introspection: process.env.NODE_ENV !== 'production',
      context: ({ req }) => ({ req }),
      cache: 'bounded',
      csrfPrevention: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LessonsModule,
    QuizzesModule,
    ProgressModule,
    LeadsModule,
    OrdersModule,
    AnalyticsModule,
    InquiriesModule,
    PromotionsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
