const Delivery = require('../models/delivery')


//create delivery
exports.addDelivery = (req, res) => {
  const delivery = new Delivery({
    recipient: req.body.recipient,
    orderItems: req.body.orderItems,
    courier: req.body.courier,
    estimedTime: req.body.estimedTime,
  })
  delivery.save((err, delivery) => {
    if (err) return res.status(500).json({ error: err })
    return res.json(delivery)
  })
}

//read delivery
exports.getDelivery = (req, res) => {
  Delivery.find()
    .then((delivery) => {
      if (!delivery) return res.status(404).json({ message: 'Proses pengiriman tidak ditemukan' })
      return res.json(delivery)
    })
    .catch((err) => console.log(err))
}



//update delivery
exports.updateDelivery = (req, res) => {
  const deliveryId = req.params._id;
  const updatedData = {
    recipient: req.body.recipient,
    orderItems: req.body.orderItems,
    courier: req.body.courier,
    estimedTime: req.body.estimedTime,
  };

  Delivery.findByIdAndUpdate(deliveryId, updatedData, { new: true })
    .then((updatedDelivery) => {
      if (!updatedDelivery) {
        return res.status(404).json({ message: 'Delivery Update not found' });
      }
      return res.json(updatedDelivery);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update delivery' });
    });
};

//delete delivery
exports.deleteDelivery = (req, res) => {
  const deliveryId = req.params._id;

  Delivery.findByIdAndDelete(deliveryId)
    .then((deletedDelivery) => {
      if (!deletedDelivery) {
        return res.status(404).json({ message: 'Delivery process not found' });
      }
      return res.json({ message: 'Delivery deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete Delivery' });
    });
};