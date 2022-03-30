import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;
export type UserModel = { _doc?: UserDocument };

@Schema()
export class User {

    @Prop() id: string;

    @Prop() firstName: string;

    @Prop() lastName: string;

    @Prop() phone: string;

    @Prop() email: string;

    @Prop() password: string;

    @Prop() passwordEditable: boolean;

}

export const UserSchemaName = User.name;

export const UserSchema = SchemaFactory.createForClass(User);