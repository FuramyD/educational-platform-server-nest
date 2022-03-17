import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, UserSchemaName } from "../schemas/user.schema";
import { UsersRepository } from "./services/users.repository";
import { UsersController } from "./users.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserSchemaName, schema: UserSchema }
        ])
    ],
    exports: [UsersRepository],
    providers: [UsersRepository],
    controllers: [UsersController]
})
export class UsersModule {}
