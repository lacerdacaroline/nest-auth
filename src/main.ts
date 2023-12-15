import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type','Authorization'],
    origin: 'http://localhost:3000', // Allow requests from your React app
    credentials: true, // If you need to pass cookies and headers
  });
  await app.listen(8585);
}
bootstrap();
