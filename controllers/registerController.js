import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { name, email, mobile, password, image, role } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.json({
        status: 'error',
        message: 'Email has already been registered',
      });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create a new user using Prisma
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        mobile,
        password: hashPassword,
        image,
        role: role || 'Employee'
      },
    });

    return res.json({
      status: 'success',
      message: 'User has been registered',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      error: 'Internal Server Error',
    });
  } finally {
    await prisma.$disconnect();
  }
};
