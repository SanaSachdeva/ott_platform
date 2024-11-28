import { User } from "../models/userModel.js"; 
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false,
            });
        }

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        const isMatch = await bcryptjs.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        const tokenData = {
            id: user._id,
        };

        // Correct way to use jwt.sign
        const token = jwt.sign(tokenData, "abcdfrtyhnbewsxmj", { expiresIn: "1d" });

        return res
            .status(200)
            .cookie("token", token, { httpOnly: true })
            .json({
                message: `Welcome back ${user.FullName}`,
                user,
                success: true,
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const Logout = async (req, res) => {
    return res
        .status(200)
        .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true })
        .json({
            message: "Logged out successfully",
            success: true
        });
};

    
export const Register = async (req, res) => {
    try {
        const {FullName, Email, Password} = req.body;
        if(!FullName || !Email || !Password){
            return res.status(401).json({
                message:"Invalid data",
                success:false
            })
        }

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered",
                success: false,
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcryptjs.hash(Password, 16);

        // Create the user in the database
        const newUser = await User.create({
            FullName,
            Email,
            Password: hashedPassword,
        });

        // Return the user data without the password for security
        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            user: {
                FullName: newUser.FullName,
                Email: newUser.Email,
                Password: Password,  // You can remove this if you don't want to send the password back
            },
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export default Register;
