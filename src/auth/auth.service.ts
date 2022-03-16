import { Injectable } from "@nestjs/common";
import { User } from "../models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, UserSchemaName } from "../schemas/user.schema";
import { LoginDto, RegistrationDto } from "../dto/login.dto";

@Injectable()
export class AuthService {

    constructor(@InjectModel(UserSchemaName) private userModel: Model<UserDocument>) {}

    public login(loginDto: LoginDto): Promise<User> {
        return this.userModel.findOne({
            $or: [
                { email: loginDto.login, password: loginDto.password },
                { phone: loginDto.login, password: loginDto.password }
            ]
        }).exec();
    }

    public async registration(registrationDto: RegistrationDto): Promise<User> {
        const user = await this.userModel.findOne({
            $or: [
                { email: registrationDto.email },
                { phone: registrationDto.phone }
            ]
        }).exec();

        if (user) {
            return null;
        }

        const createdUser = new this.userModel(registrationDto);
        await createdUser.save();
        return createdUser;
    }

}
