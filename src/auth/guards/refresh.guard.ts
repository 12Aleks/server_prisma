import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class RefreshJwtGuard implements CanActivate{
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFunction(request);

        if(!token) throw new UnauthorizedException();

        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_REFRESH_KEY
            });

            request['user'] = payload

        }catch{
            throw new UnauthorizedException();
        }

        return true;

    }

    private extractTokenFunction(request: Request){
        const [type, token] = request.headers.authorization.split(' ') ?? [];

        return type === 'Refresh' ? token : undefined;

    }
}