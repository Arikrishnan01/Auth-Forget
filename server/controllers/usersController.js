import bcrypt from "bcrypt";
import usersModel from "../models/usersModel.js";
import jwt from "jsonwebtoken";

/**
 * req: input
 * res: output
 * method: post
 * path: /usersSignUp
 */

export const usersSignUp = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;

    /** Check if email exists */
    const existUserSignUp = await usersModel.findOne({ email });
    if (existUserSignUp) {
      return res.status(400).json({
        message: "User already exists, try another email...",
      });
    }

    /** Check if any field is empty */
    if (!userName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Fill Name, Email, Password, and Confirm Password...",
      });
    }

    /** Check if password matches confirmPassword */
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match...",
      });
    }

    /** Hash the password for safety purpose */
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserSignUp = new usersModel({
      userName,
      email,
      password: hashedPassword,
    });
    await newUserSignUp.save();
    return res.status(200).json({
      status: true,
      message: "New user registered successfully!!!",
      data: newUserSignUp,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const usersSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    /**find the existng  user which is email */
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Atlas, could not find the user email!!!",
      });
    }

    /**check the password match */
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        status: false,
        message: "Password does not match existing password!!!",
      });
    }

    /**generate token */
    const generateToken = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: "24h"}
    )
    // res.cookie("generateToken", generateToken, { httpOnly: true, maxAge: 360000})
    return res.status(200).json({
        status: true,
        message: "Atlas, user signIn successfully!!!",
        token: generateToken
    })

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server Error!!",
      error: error.message,
    });
  }
};
