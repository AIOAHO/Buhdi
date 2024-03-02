// backend/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name: string;
  assistantId: string;
  threadId: string;
  enneagramResults: Array<{ type: string; score: number }>;
  status: string; // Add this line
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, default: null },
  assistantId: { type: String, default: null },
  threadId: { type: String, default: null },
  enneagramResults: [{
    type: { type: String },
    score: { type: Number }
  }],
  status: { type: String, default: 'waiting_list' }, // Define the status field here
});

const User = mongoose.model<User>('User', userSchema);

export default User;
