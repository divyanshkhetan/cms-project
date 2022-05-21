import connectDB from "../../../middleware/mongodb";
import Course from "../../../models/course";
import url from "url";

const handler = async (req, res) => {
  try {
    // console.log(req.url);
    const courseId = req.url.split("/")[3];
    // console.log(courseId);
    const course = await Course.findOne({
      courseId: courseId,
    }).populate("instructor");
    // console.log(course);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course found",
      course: {
        name: course.name,
        description: course.description,
        duration: course.duration,
        price: course.price,
        instructorName: course.instructor[0].name,
        instructorRollno: course.instructor[0].rollno,
        instructorEmail: course.instructor[0].email,
        enrolled: course.enrolled,
        createdAt: course.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error finding course",
      error: error,
    });
  }
};

export default connectDB(handler);
