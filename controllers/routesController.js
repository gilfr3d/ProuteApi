import prisma from '../config/db.js';

export const createRoutes = async (req, res) => {
  const { name, waypoints, schedule, distance } = req.body;

  if (!name || !waypoints || !schedule ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newRoute = await prisma.routes.create({
      data: {
        name,
        waypoints: JSON.stringify(
          waypoints.split(',').map((point) => point.trim())
        ),
        distance: parseFloat(distance),
        schedule: schedule.toString(),
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
  const { name, waypoints, distance, schedule } = req.body;

  try {
    const existingRoute = await prisma.routes.findUnique({
      where: { id: parseInt(routeId) },
    });

    if (!existingRoute) {
      return res.status(404).json({ error: 'Route not found' });
    }

    let updatedWaypoints;
    if (typeof waypoints === 'string') {
      updatedWaypoints = JSON.stringify(waypoints.split(',').map((point) => point.trim()));
    } else {
      updatedWaypoints = existingRoute.waypoints;
    }
    const updatedRoute = await prisma.routes.update({
      where: { id: parseInt(routeId) },
      data: {
        name: name !== undefined ? name : existingRoute.name,
        waypoints: updatedWaypoints,
        distance: distance !== undefined ? parseFloat(distance) : existingRoute.distance,
        schedule: schedule !== undefined ? schedule.toString() : existingRoute.schedule,
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
