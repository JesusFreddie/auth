import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    DbModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
