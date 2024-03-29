import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {PrismaSevice} from "./prisma.sevice";
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, PostModule],
  controllers: [],
  providers: [PrismaSevice],
})
export class AppModule {}
