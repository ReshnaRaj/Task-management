import mongoose, { Document, Schema, Types } from "mongoose";
export interface ITask extends Document {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "in-review" | "done";
  dueDate: Date;
  assignedTo:Types.ObjectId;
  createdBy: Types.ObjectId;
  attachments: string[];
  comments: IComment[];
}
export interface IComment {
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
}
const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "high", "medium"],
    required: true,
  },
  status: {
    type: String,
    enum: ["todo","in-review", "done", "in-progress"],
  },
  dueDate: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },
  
  attachments: {
    type: [String],
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
export const TaskModel=mongoose.model<ITask>("Task",taskSchema)
