// backend/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name: string;
  assistantId: string;
  threadId: string;
  enneagramResults: Array<{ type: string; score: number }>;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: null },
  assistantId: { type: String, default: null },
  threadId: { type: String, default: null },
  enneagramResults: [{
    type: { type: String },
    score: { type: Number }
  }],
});

const User = mongoose.model<User>('User', userSchema);

export default User;