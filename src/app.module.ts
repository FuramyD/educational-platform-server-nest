import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";


@Module({
    imports: [
        MongooseModule.forRoot("mongodb+srv://educationPlatform:educationPlatform1234!@cluster0.zj6m5.mongodb.net/educationPlatform?retryWrites=true&w=majority"),
        AuthModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
