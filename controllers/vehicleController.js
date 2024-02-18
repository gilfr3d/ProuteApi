import prisma from '../config/db.js';

export const createVehicle = async (req, res) => {
  const dummyVehicle = [
    {
      vehicle_name: 'Toyota Hiace Cargo Van',
      license_plate: 'DEF456',
      delivery_date: '2022-01-12T09:19:53Z',
      cargo_type: 'clothing',
      destination_address: '61325 Forster Street',
      delivery_status: 'returned',
      estimated_delivery_time: '10:38 AM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Isuzu NPR Box Truck',
      license_plate: 'JKL321',
      delivery_date: '2022-04-14T18:05:16Z',
      cargo_type: 'automobile parts',
      destination_address: '998 Bartelt Point',
      delivery_status: 'shipped',
      estimated_delivery_time: '12:31 PM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Mitsubishi Fuso Canter Flatbed',
      license_plate: 'MNO654',
      delivery_date: '2022-08-05T23:38:52Z',
      cargo_type: 'clothing',
      destination_address: '6 Jay Parkway',
      delivery_status: 'returned',
      estimated_delivery_time: '2:40 PM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Hino 500 Series Reefer Truck',
      license_plate: 'VWX135',
      delivery_date: '2022-10-18T04:41:45Z',
      cargo_type: 'food items',
      destination_address: '277 Dryden Avenue',
      delivery_status: 'in transit',
      estimated_delivery_time: '8:27 AM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Mercedes-Benz Actros Curtain Side Truck',
      license_plate: 'STU246',
      delivery_date: '2022-01-25T16:53:01Z',
      cargo_type: 'building materials',
      destination_address: '8152 Corscot Plaza',
      delivery_status: 'lost',
      estimated_delivery_time: '3:20 PM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Volvo FH Globetrotter Tanker Truck',
      license_plate: 'GHI789',
      delivery_date: '2022-10-08T10:50:30Z',
      cargo_type: 'medical supplies',
      destination_address: '41317 Parkside Point',
      delivery_status: 'on hold',
      estimated_delivery_time: '3:41 PM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Scania P-Series Tipper Truck',
      license_plate: 'MNO678',
      delivery_date: '2022-07-19T02:00:58Z',
      cargo_type: 'clothing',
      destination_address: '5 Kensington Junction',
      delivery_status: 'in transit',
      estimated_delivery_time: '10:39 PM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Izuzu',
      license_plate: 'DEF451',
      delivery_date: '2022-01-07T05:40:24Z',
      cargo_type: 'clothing',
      destination_address: '048 Pleasure Avenue',
      delivery_status: 'cancelled',
      estimated_delivery_time: '9:40 AM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Mitsubishi',
      license_plate: 'MNO666',
      delivery_date: '2022-07-08T22:56:10Z',
      cargo_type: 'food items',
      destination_address: '70087 Maywood Trail',
      delivery_status: 'pending',
      estimated_delivery_time: '11:57 PM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Nissan',
      license_plate: 'YZA468',
      delivery_date: '2022-11-15T15:41:50Z',
      cargo_type: 'household goods',
      destination_address: '5 Canary Trail',
      delivery_status: 'shipped',
      estimated_delivery_time: '1:30 PM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Ford',
      license_plate: 'YZA447',
      delivery_date: '2022-05-29T17:02:08Z',
      cargo_type: 'furniture',
      destination_address: '81025 Birchwood Junction',
      delivery_status: 'out for delivery',
      estimated_delivery_time: '10:12 PM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Toyota',
      license_plate: 'STU244',
      delivery_date: '2022-03-11T01:08:11Z',
      cargo_type: 'furniture',
      destination_address: '6 Forest Run Avenue',
      delivery_status: 'out for delivery',
      estimated_delivery_time: '6:06 AM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Dodge',
      license_plate: 'GHI710',
      delivery_date: '2022-08-13T10:04:00Z',
      cargo_type: 'clothing',
      destination_address: '25 John Wall Trail',
      delivery_status: 'cancelled',
      estimated_delivery_time: '3:56 PM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Ford',
      license_plate: 'JKL354',
      delivery_date: '2022-12-27T18:54:09Z',
      cargo_type: 'toys',
      destination_address: '7 Comanche Parkway',
      delivery_status: 'delayed',
      estimated_delivery_time: '8:37 PM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Infiniti',
      license_plate: 'MNO677',
      delivery_date: '2022-05-31T09:07:50Z',
      cargo_type: 'sporting equipment',
      destination_address: '4145 Everett Crossing',
      delivery_status: 'returned',
      estimated_delivery_time: '9:59 PM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'BMW',
      license_plate: 'STU277',
      delivery_date: '2022-03-18T10:34:39Z',
      cargo_type: 'medical supplies',
      destination_address: '1 Pine View Street',
      delivery_status: 'lost',
      estimated_delivery_time: '5:06 AM',
      maintenance_required: true,
    },
    {
      vehicle_name: 'Buick',
      license_plate: 'XYZ700',
      delivery_date: '2022-08-20T01:02:33Z',
      cargo_type: 'medical supplies',
      destination_address: '02 Kingsford Parkway',
      delivery_status: 'pending',
      estimated_delivery_time: '1:51 AM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Suzuki',
      license_plate: 'ABC123',
      delivery_date: '2022-03-19T05:13:18Z',
      cargo_type: 'medical supplies',
      destination_address: '15 6th Street',
      delivery_status: 'cancelled',
      estimated_delivery_time: '9:58 PM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Acura',
      license_plate: 'VWX133',
      delivery_date: '2022-05-20T16:26:20Z',
      cargo_type: 'sporting equipment',
      destination_address: '662 Graedel Center',
      delivery_status: 'returned',
      estimated_delivery_time: '8:55 AM',
      maintenance_required: false,
    },
    {
      vehicle_name: 'Lining',
      license_plate: 'ABC124',
      delivery_date: '2022-03-26T11:32:48Z',
      cargo_type: 'food items',
      destination_address: '94 Rieder Road',
      delivery_status: 'lost',
      estimated_delivery_time: '8:03 AM',
      maintenance_required: true,
    },
  ];

  try {
    // Check for duplicate license plates before inserting vehicles
    const existingLicensePlates = await prisma.vehicles.findMany({
      where: {
        OR: dummyVehicle.map((vehicle) => ({
          license_plate: vehicle.license_plate,
        })),
      },
      select: {
        license_plate: true,
      },
    });

    const duplicateLicensePlates = existingLicensePlates.map(
      (vehicle) => vehicle.license_plate
    );

    if (duplicateLicensePlates.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate license plates found',
        duplicateLicensePlates: duplicateLicensePlates,
      });
    }
    const createdVehicles = await prisma.vehicles.createMany({
      data: dummyVehicle,
    });

    return res.json({
      success: true,
      message: 'Vehicle inserted successfully.',
      data: createdVehicles,
    });
  } catch (error) {
    console.error('Error inserting vehicles:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicles.findMany();

    return res.status(200).json({
      status: 'success',
      data: vehicles,
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return res.status(500).json({
      status: 'error',
      error: 'Internal Server Error',
    });
  }
};
export const updateVehicle = async (req, res) => {
  const { license_plate } = req.params;
  const {
    delivery_date,
    cargo_type,
    destination_address,
    delivery_status,
    estimated_delivery_time,
    maintenance_required,
  } = req.body;

  try {
    const existingVehicle = await prisma.vehicles.findFirst({
      where: { license_plate },
    });
    if (!existingVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Update vehicle
    const updatedVehicle = await prisma.vehicles.update({
      where: { license_plate },
      data: {
        delivery_date,
        cargo_type,
        destination_address,
        delivery_status,
        estimated_delivery_time,
        maintenance_required,
      },
    });

    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Vehicle updated',
        vehicle: updatedVehicle,
      },
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return res.status(500).json({
      status: 'error',
      error: 'Internal Server Error',
    });
  }
};

export const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleId = parseInt(id);
    if (isNaN(vehicleId)) {
      return res.status(400).json({ error: 'Invalid Vehicle' });
    }

    const existingVehicle = await prisma.vehicles.findUnique({
      where: { id: vehicleId },
    });
    if (!existingVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    await prisma.vehicles.delete({
      where: { id: vehicleId },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Vehicle deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return res.status(500).json({
      status: 'error',
      error: 'Internal Server Error',
    });
  }
};
