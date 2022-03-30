import { Controller, Get, Param } from "@nestjs/common";
import { UsersRepository } from "./services/users.repository";
import { UserDocument } from "../schemas/user.schema";
import { RestApiQueryParams } from "../models/repository.model";

@Controller("users")
export class UsersController {

    constructor(private usersRepository: UsersRepository) {}

    @Get()
    public getAllUsers(@Param() params: RestApiQueryParams): Promise<UserDocument[]> {
        return this.usersRepository.findAll(params);
    }

    @Get("/:id")
    public getUserById(@Param("id") id: string): Promise<UserDocument> {
        return this.usersRepository.findOne({ _id: id });
    }

}
