import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
    @Prop({ unique: true, index: true })
    username: string;
    @Prop({ unique: true, index: true })
    email: string;
    @Prop({index: true })
    firstName: string;
    @Prop({index: true })
    lastName: string;
    @Prop({index: true })
    picture: string;
}

export const UserSchema = SchemaFactory.createForClass( User );
