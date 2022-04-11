import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(80, { transports: ["websocket"] })
export class ChatsGateway {

    @SubscribeMessage("message")
    handleMessage(
        @MessageBody() data: unknown,
        @ConnectedSocket() client: any
    ): string {
        return "Hello world!";
    }
}
