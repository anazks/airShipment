const mongoose = require('mongoose');
const FuzzyLogic = require('fuzzylogic');

// Define the DeliveryBoy schema
const deliveryBoySchema = new mongoose.Schema({
  name: String,
  availability: Number // Availability rating (0-10)
});

// Create the DeliveryBoy model
const DeliveryBoy = mongoose.model('DeliveryBoy', deliveryBoySchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Fuzzy logic configuration
    const deliveryBoyAvailabilityThreshold = 5; // Minimum availability rating to consider a delivery boy available
    const deliveryBoyAvailabilityWeight = 0.6; // Weight for availability in fuzzy logic calculation

    // Fuzzy logic function to calculate availability score
    function calculateAvailabilityScore(availability) {
      return FuzzyLogic.trapezoid(availability, deliveryBoyAvailabilityThreshold - 2, deliveryBoyAvailabilityThreshold, 10, 10);
    }

    // Find available delivery boys
    DeliveryBoy.find({ availability: { $gte: deliveryBoyAvailabilityThreshold } })
      .then(deliveryBoys => {
        // Calculate availability scores
        const availableDeliveryBoys = deliveryBoys.map(deliveryBoy => ({
          ...deliveryBoy.toObject(),
          availabilityScore: calculateAvailabilityScore(deliveryBoy.availability)
        }));

        // Sort by availability score in descending order
        availableDeliveryBoys.sort((a, b) => b.availabilityScore - a.availabilityScore);

        console.log('Available Delivery Boys:');
        availableDeliveryBoys.forEach(deliveryBoy => {
          console.log(`Name: ${deliveryBoy.name}, Availability: ${deliveryBoy.availability}, Score: ${deliveryBoy.availabilityScore}`);
        });

        // Close the MongoDB connection
        mongoose.connection.close();
      })
      .catch(error => {
        console.error('Error retrieving delivery boys:', error);
        mongoose.connection.close();
      });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
