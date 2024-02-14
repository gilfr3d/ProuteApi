import prisma from '../config/db.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.products.findMany({
            // Convert BigInt fields to strings
            select: {
                id: true,
                product_name: true,
                price: true,
                order_number: true,
                customer_number: true,
                gtin: product => product.gtin.toString(),
                gln: product => product.gln.toString(),
                manufacturer: true,
                manufactured_date: true,
                expiry_date: true,
                country_of_origin: true,
            },
        });

        return res.status(200).json({
            status: 'success',
            data: {
                products,
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal Server Error',
        });
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
