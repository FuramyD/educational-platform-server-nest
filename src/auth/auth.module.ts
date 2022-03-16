import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, UserSchemaName } from "../schemas/user.schema";

@Module({
    imports: [MongooseModule.forFeature([
        { name: UserSchemaName, schema: UserSchema }
    ])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
