import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    ClassSerializerInterceptor,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.setGlobalPrefix('api');
    await app.listen(3000);
}
void bootstrap().finally(() => {
    console.log('Backend service is running on http://localhost:3000');
});
