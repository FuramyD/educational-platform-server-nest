import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserSchemaName } from "../../schemas/user.schema";
import { FilterQuery, Model } from "mongoose";
import { RegistrationDto } from "../../dto/login.dto";


@Injectable()
export class UsersRepository {

    constructor(@InjectModel(UserSchemaName) private userModel: Model<UserDocument>) {}

    public async findOne(filters: FilterQuery<UserDocument>): Promise<UserDocument> {
        return this.userModel.findOne(filters).exec();
    }

    public async createOne(registrationDto: RegistrationDto): Promise<UserDocument> {
        const createdUser = new this.userModel(registrationDto);
        await createdUser.save();

        return createdUser;
    }

}