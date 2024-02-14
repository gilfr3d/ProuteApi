import prisma from '../config/db.js';

const getAllUsers = async (req, res) => {
    try {
      const allUsers = await prisma.users.findMany({
        include: {
          admins: true,
        },
      });
  
      res.json(allUsers);
    } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  };

  export const getUserById = async (req, res) => {
    const userId = parseInt(req.params.userId); 
  
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  };

  //insert dummy data
  export const createProducts = async (req, res) => {
   
    try {
      // Insert dummy product data into the database
      const createdProducts = await prisma.products.createMany({
        data: dummyProducts,
      });
  
      return res.json({
        success: true,
        message: 'Dummy products inserted successfully.',
        data: createdProducts,
      });
    } catch (error) {
      console.error('Error inserting dummy products:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };


  export  {
    getAllUsers,
  }