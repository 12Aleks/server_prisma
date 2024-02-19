import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaSevice} from "../prisma.sevice";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [UserService, PrismaSevice, JwtService],
  controllers: [UserController]
})
export class UserModule {}
