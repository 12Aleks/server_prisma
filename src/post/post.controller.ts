import {Body, Controller, Get, Post} from '@nestjs/common';
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/post.dto";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }
    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        return await this.postService.createPost(createPostDto)
    }

    @Get()
    async findAllPosts(){
       return await this.postService.findAllPosts()
    }
}
