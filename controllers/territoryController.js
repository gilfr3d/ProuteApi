import prisma from '../config/db.js';

export const createTerritories = async (req, res) => {
    const { name, address, distance } = req.body;
  
    if (!name || !distance) {
        return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
        // Check if the territory with the given name already exists
        const existingTerritory = await prisma.territories.findUnique({
            where: {
                name: name,
            },
        });
      
        if (existingTerritory) {
            return res.status(409).json({
                status: 'error',
                message: 'Territory already exists',
            });
        }
      
        // Create the new territory
        const newTerritory = await prisma.territories.create({
            data: {
                name,
                address,
                distance: parseFloat(distance),
            },
        });

        return res.status(201).json({
            status: 'success',
            data: {
                message: 'Territory created',
                territory: newTerritory,
            },
        });
    } catch (error) {
        console.error('Error creating territory:', error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllTerritories = async (req, res) => {
    try {
        const territories = await prisma.territories.findMany();

        return res.status(200).json({
            status: 'success',
            data: {
                territories,
            },
        });
    } catch (error) {
        console.error('Error fetching territories:', error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    } finally {
        await prisma.$disconnect();
    }
};

export const getOneTerritory = async (req, res) => {
    const { territoryId } = req.params;

    try {
        const territory = await prisma.territories.findUnique({
            where: {
                id: parseInt(territoryId),
            },
        });

        if (!territory) {
            return res.status(404).json({
                status: 'error',
                message: 'Territory not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                territory,
            },
        });
    } catch (error) {
        console.error('Error fetching territory:', error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    } finally {
        await prisma.$disconnect();
    }
};
