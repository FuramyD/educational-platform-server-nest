import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";


@Module({
    imports: [
        MongooseModule.forRoot("mongodb+srv://educationPlatform:educationPlatform1234!@cluster0.zj6m5.mongodb.net/educationPlatform?retryWrites=true&w=majority"),
        AuthModule,
        ConfigModule.forRoot(),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
