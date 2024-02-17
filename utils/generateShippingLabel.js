export const generateShippingLabel = async (order) => {
    // Extract necessary data from the order
    const { product_name, gtin, gln, shipping_address, city, postal_code } = order;
  
    // Construct the shipping label data
    const shippingLabel = {
      product_name,
      gtin,
      gln,
      shipping_address,
      city,
      postal_code,
      // Add more shipping label data as needed
    };
    return shippingLabel;
  };
  