
// Function to generate a random tracking number
const generateTrackingNumber = () => {
  const randomPart = Math.floor(Math.random() * 1000000000); // Generate a random 9-digit number
  const trackingNumber = `TN${randomPart}`; 
  return trackingNumber;
};

// Function to calculate estimated delivery date (e.g., 7 days from the current date)
const calculateEstimatedDeliveryDate = () => {
  const currentDate = new Date();
  const estimatedDeliveryDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days to the current date
  return estimatedDeliveryDate.toISOString(); // Convert the date to ISO string format
};


export const initiateShipment = async (
  order,
  shippingLabel,
  customStatus,
  customCarrier,
  customTrackingNumber,
  customEstimatedDeliveryDate
) => {

  let status;

  switch (customStatus) {
    case 'Pending':
      status = 'Pending';
      break;
    case 'Delivered':
      status = 'Delivered';
      break;
    default:
      status = 'Shipped';

  const shipmentStatus = {
    status: customStatus || 'Shipped', // Default to 'Shipped' if customStatus is not provided
    carrier: customCarrier || 'PRoute', // Default to 'PRoute' if customCarrier is not provided
    trackingNumber: customTrackingNumber || generateTrackingNumber(), // Generate a tracking number if not provided
    estimatedDeliveryDate: customEstimatedDeliveryDate || calculateEstimatedDeliveryDate(), // Calculate estimated delivery date if not provided
    // Other shipment status details
  };

  return shipmentStatus;
}

}