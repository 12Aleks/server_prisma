

import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsOptional()
    authorId?: number;
}