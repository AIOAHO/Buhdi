// backend/models/waitingList.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface WaitingListEntry extends Document {
  email: string;
  status: string; // Optional: You might use this if you want to track different statuses within the waiting list, such as 'waiting', 'approved'.
  createdAt: Date;
}

const waitingListSchema = new Schema({
  email: { type: String, required: true, unique: true },
  status: { type: String, default: 'waiting', enum: ['waiting', 'approved'] }, // Adjust as needed
  createdAt: { type: Date, default: Date.now },
});

const WaitingList = mongoose.model<WaitingListEntry>('WaitingList', waitingListSchema);

export default WaitingList;
