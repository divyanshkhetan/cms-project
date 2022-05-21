import mongoose from "mongoose";
import { nanoid } from "nanoid";
let { Schema } = mongoose;

let course = new Schema({
  name: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    default: nanoid(10),
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  instructor: [{ type: Schema.Types.ObjectId, ref: "User" }],
  price: {
    type: Number,
    default: 0,
  },
  enrolled: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Course;
try {
  Course = mongoose.model("Course");
} catch (err) {
  Course = mongoose.model("Course", course);
}

module.exports = Course;
