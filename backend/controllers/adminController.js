import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    console.log({ name, email, password, speciality, degree, experience, about, fees, address }, imageFile);

    // Validate required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Check if a file was uploaded
    if (!imageFile) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    // Save doctor to the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
//  api for admin login
const loginAdmin=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(email===process.env.ADMIN_EMAIL&&password==process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
          res.json({success:false,message:"Invalid credentials"})
         
        }
    }catch(error)
    {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get all doctors for admin panel
const allDoctors=async(req,res)=>{
      try {
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
      }
}
export { addDoctor,loginAdmin,allDoctors };
