import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerD } from './swagger';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  swaggerD(app);
  await app.listen(port, () => {
    console.log(`we are listen on port ${port} .....`);
  });

}

bootstrap();
