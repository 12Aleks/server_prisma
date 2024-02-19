import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {PrismaSevice} from "../prisma.sevice";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [PostService, PrismaSevice, JwtService],
  controllers: [PostController]
})
export class PostModule {}
