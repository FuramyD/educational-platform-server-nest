import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserSchemaName } from "../../schemas/user.schema";
import { FilterQuery, UpdateQuery, Model } from "mongoose";
import { RegistrationDto } from "../../dto/auth.dto";
import { RestApiQueryParams } from "../../models/repository.model";


@Injectable()
export class UsersRepository {

    constructor(@InjectModel(UserSchemaName) private userModel: Model<UserDocument>) {}

    public async findAll(params: RestApiQueryParams): Promise<UserDocument[]> {
        const filters: FilterQuery<UserDocument> = {};
        return this.userModel.find().exec();
    }

    public async findOne(filters: FilterQuery<UserDocument>): Promise<UserDocument> {
        return this.userModel.findOne(filters).exec();
    }

    public async findOneById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    public async createOne(registrationDto: RegistrationDto): Promise<UserDocument> {
        const createdUser = new this.userModel(registrationDto);
        await createdUser.save();

        return createdUser;
    }

    public async updateUserById(id: string, updateQuery: UpdateQuery<UserDocument>): Promise<UserDocument> {
        return (await this.findOneById(id)).update(updateQuery).exec();
    }

}