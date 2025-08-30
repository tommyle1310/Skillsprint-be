import { Module, Controller, Get } from '@nestjs/common';
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

@Controller()
export class AppController {
  @Get('/health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}

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
      // Production optimizations
      ...(process.env.NODE_ENV === 'production' && {
        formatError: (error) => ({
          message: error.message,
          ...(process.env.NODE_ENV !== 'production' && { stack: (error as any).stack }),
        }),
        plugins: [],
      }),
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
  controllers: [AppController],
})
export class AppModule {}
