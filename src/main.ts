import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Optimize for production memory usage
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['log', 'debug', 'error', 'warn'],
    // Disable body parser for GraphQL to reduce memory usage
    bodyParser: false,
  });
  
  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 SkillSprint Backend running on port ${port}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
  }
}

bootstrap();
