import connectDB from "../../middleware/mongodb";
import User from "../../models/user";

const bcrypt = require("bcrypt");

const handler = async (req, res) => {
  // console.log(req.method);
  if (req.method == "POST") {
    // Check if email, userType and password is provided
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await User.findOne({ email });
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return res.status(200).json({
              name: user.name,
              email: user.email,
              rollno: user.rollno,
              userType: user.userType,
            });
          } else {
            return res.send(null);
          }
        } else {
          return res.send(null);
        }
      } catch (error) {
        return res.status(500).send(null);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
