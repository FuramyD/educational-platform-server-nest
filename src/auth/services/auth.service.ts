import { Injectable } from "@nestjs/common";
import { User } from "../../models/user.model";
import { JwtDto, RegistrationDto } from "../../dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "../../users/services/users.repository";
import { UserDocument, UserModel } from "../../schemas/user.schema";

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    public async validateUser(login: string, password: string): Promise<UserDocument> {
        return await this.userRepository.findOne({
            $or: [
                { email: login, password },
                { phone: login, password }
            ]
        });
    }

    public async login({ _doc: user }: UserModel): Promise<JwtDto> {
        const payload = { id: user._id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    public async registration(registrationDto: RegistrationDto): Promise<User> {
        const user = await this.userRepository.findOne({
            $or: [
                { email: registrationDto.email },
                { phone: registrationDto.phone }
            ]
        });

        if (user) {
            return null;
        }

        const createdUser = await this.userRepository.createOne(registrationDto);
        const { password, ...securedUser } = createdUser;
        return securedUser;
    }

}
