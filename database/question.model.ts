import { Schema, model, models, Types } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  author: Types.ObjectId;
  answers: number;
  tags: Types.ObjectId[];
  views: number;
  upvotes: number;
  downvotes: number;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: { type: Number, default: 0 },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
