import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
void bootstrap().then(() => {
    console.log('Backend service is running on http://localhost:3000');
});
