import {Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/post.dto";
import {PrismaSevice} from "../prisma.sevice";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaSevice) {
    }

    async createPost(dto: CreatePostDto) {
        const newPost = await this.prisma.post.create({
            data: dto
        })

        return newPost;
    }

    async findAllPosts(){
        return await this.prisma.post.findMany()
    }
}
