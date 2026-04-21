import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsModule } from './requests/requests.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 🔥 ye zaroor lagana
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    RequestsModule,
  ],
})
export class AppModule {}