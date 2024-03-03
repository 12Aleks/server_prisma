import {ConflictException, HttpException, Injectable} from '@nestjs/common';
import {PrismaSevice} from "../prisma.sevice";
import {CreateUserDto} from "./dto/user.dto";
import {encodePassword} from "../utils/bcrypt";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaSevice) {
    }

    async create(dto: CreateUserDto) {
        console.log(dto)

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (user) throw new ConflictException('Duplicate email address!');
        const encode = await encodePassword(dto.password);

        console.log(encode)

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: encode
            }
        });

        const {password, ...result} = newUser;

        return result;
    }


    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({where: {email}})
    }

    async findById(id: number) {
        return await this.prisma.user.findUnique({where: {id}})
    }
}
