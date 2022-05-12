import connectDB from "../../middleware/mongodb";
import User from "../../models/user";

const bcrypt = require("bcrypt");

const handler = async (req, res) => {
  // console.log(req.method);
  if (req.method === "POST") {
    // Check if name, rollno, userType, email or password is provided
    const { name, email, rollno, userType, password } = req.body;
    if (name && rollno && userType && email && password) {
      try {
        // Hash password to store it in DB
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
          name,
          email,
          rollno,
          userType,
          password: hashedPassword,
        });

        // Create new user
        const usercreated = await user.save();
        // console.log(usercreated);
        return res.status(200).json({
          success: true,
          message: "User created successfully",
          user: usercreated,
        });
      } catch (error) {
        if (error.code == "11000") {
          return res.status(200).json({
            success: false,
            message: "User already exists",
          });
        }
        return res.status(500).json({
          success: false,
          message: "Error creating user",
          error: error,
        });
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
