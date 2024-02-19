import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {UserService} from "../user/user.service";
import {comparePassword} from "../utils/bcrypt";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private jwtService: JwtService
    ) {
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto);

        const payload = {
            username: user.email,
            sub: {
                name: user.name
            }
        };

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '20s',
                    secret: process.env.JWT_SECRET_KEY,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JWT_SECRET_REFRESH_KEY,
                })
            }
        }


    }

    async validateUser(dto: AuthDto) {
        const user = await this.userService.findByEmail(dto.username);

        const checkPassword = comparePassword(dto.password, user.password)

        if (user && checkPassword) {
            const {password, ...result} = user;
            return result
        }

        throw new UnauthorizedException('Your email or password is incorrect');
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub
        };

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '20s',
                secret: process.env.JWT_SECRET_KEY,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_SECRET_REFRESH_KEY,
            })
        }
    }

}
