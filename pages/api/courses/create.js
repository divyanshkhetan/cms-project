import connectDB from "../../../middleware/mongodb";
import Course from "../../../models/course";
import User from "../../../models/user";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, description, price, instructor } = req.body;
    let course;
    try {
      if (instructor) {
        let user = await User.findOne({ rollno: instructor });
        if (!user) {
          return res.status(400).json({
            message: "Instructor not found",
          });
        }
        course = new Course({ name, description, price, instructor: user._id });
      }
      console.log(course);
      const courseCreated = await course.save();
      console.log(courseCreated);
      return res.status(200).json({
        success: true,
        message: "Course created successfully",
        course: courseCreated,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error creating course",
        error: error,
      });
    }
  }
};

export default connectDB(handler);
