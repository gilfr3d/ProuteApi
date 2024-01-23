import prisma from '../config/db.js';

const getAllUsers = async (req, res) => {
    try {
      // const allUsers = await prisma.users.findMany()
      const allUsers = await prisma.users.findMany({
        include: {
          permissions: true,
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
        // include: {
        //   permissions: true,
        //   admins: true,
        // },
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

const getAllPermissions = async (req, res) => {
    try {
      const allPermissions = await prisma.permission.findMany();
  
      res.json(allPermissions);
    } catch (error) {
      console.error('Error fetching all permissions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  };

  export  {
    getAllUsers,
    getAllPermissions
  }