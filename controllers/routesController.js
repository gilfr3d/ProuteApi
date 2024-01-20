import prisma from '../config/db.js';

export const createRoutes = async (req, res) => {
    const { name, waypoints, distance, distanceUnit, routeSchedule, time } = req.body;
  
    try {
      const newRoute = await prisma.routes.create({
        data: {
          name,
          waypoints: JSON.stringify(waypoints.split(',').map(point => point.trim())),
          distance,
          distanceUnit,
          routeSchedule: new Date(routeSchedule), // Convert to Date object
          time,
        },
      });
  
      return res.json({
        status: 'success',
        data: {
          message: 'Route created',
          route: newRoute,
        },
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
  

export const getPlanRoutes = async (req, res) => {
  try {
    const routes = await prisma.routes.findMany();
    const routesWithWaypointsArray = routes.map((route) => ({
      ...route,
      waypoints: JSON.parse(route.waypoints),
    }));
    res.json(routesWithWaypointsArray);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateRoute = async (req, res) => {
    const { routeId } = req.params;
    const { name, waypoints, distance, distanceUnit, routeSchedule, time } = req.body;
  
    try {
      // Check if the route with the given ID exists
      const existingRoute = await prisma.routes.findUnique({
        where: { id: parseInt(routeId) },
      });
  
      if (!existingRoute) {
        return res.status(404).json({ error: 'Route not found' });
      }
  
      // Update the existing route
      const updatedRoute = await prisma.routes.update({
        where: { id: parseInt(routeId) },
        data: {
          name: name || existingRoute.name,
          waypoints: waypoints ? JSON.stringify(waypoints.split(',').map(point => point.trim())) : existingRoute.waypoints,
          distance: distance || existingRoute.distance,
          distanceUnit: distanceUnit || existingRoute.distanceUnit,
          routeSchedule: routeSchedule ? new Date(routeSchedule) : existingRoute.routeSchedule,
          time: time || existingRoute.time,
        },
      });
  
      return res.json({
        status: 'success',
        data: {
          message: 'Route updated',
          route: updatedRoute,
        },
      });
    } catch (error) {
      console.error('Error updating route:', error);
      return res.status(500).json({
        status: 'error',
        error: 'Internal Server Error',
      });
    } finally {
      await prisma.$disconnect();
    }
  };
  
export const deleteRoute = async (req, res) => {
  const { routeId } = req.params;

  try {
    const existingRoute = await prisma.routes.findUnique({
      where: { id: parseInt(routeId) },
    });

    if (!existingRoute) {
      return res.status(404).json({ error: 'Route not found' });
    }

    await prisma.routes.delete({
      where: { id: parseInt(routeId) },
    });

    res.json({
      status: 'success',
      message: 'Route deleted',
    });
  } catch (error) {
    console.error('Error deleting route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
