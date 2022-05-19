import mongoose from "mongoose";
let { Schema } = mongoose;

let course = new Schema({
  name: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  Duration: {
    type: Number,
    default: 0,
  },
  Instructor: [{ type: Schema.Types.ObjectId, ref: "User" }],
  Fee: {
    type: Number,
    default: 0,
  },
  Enrolled: {
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
