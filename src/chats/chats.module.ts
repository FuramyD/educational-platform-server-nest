import { Module } from "@nestjs/common";
import { ChatsController } from "./chats.controller";
import { ChatsGateway } from "./chats.gateway";

@Module({
    controllers: [ChatsController],
    providers: []
})
export class ChatsModule {}
