import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type MessageDocument = HydratedDocument<Message>;
@Schema()
export class Message {
  @Prop({ type: Types.ObjectId })
  id: Types.ObjectId;

  @Prop()
  text: string;

  @Prop()
  timestamp: string;

  @Prop()
  user: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);