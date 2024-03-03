import {Body, Controller, Inject, Post, UseGuards, Request} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/user.dto";
import {UserService} from "../user/user.service";
import {AuthDto} from "./dto/auth.dto";
import {AuthService} from "./auth.service";
import {RefreshJwtGuard} from "./guards/refresh.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService,
                private readonly authService: AuthService
                ) {}
    @Post('registration')
    async registration(@Body() dto:CreateUserDto){
       return await this.userService.create(dto);
    }

    @Post('login')
    async login(@Body() dto: AuthDto){
        console.log(dto)
        return await this.authService.login(dto)
    }

    @UseGuards(RefreshJwtGuard)
    @Post("refresh")
    async refreshToken(@Request() req){
       return await this.authService.refreshToken(req.user)
    }
}
