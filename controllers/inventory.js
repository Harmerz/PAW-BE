const InventoryMasak = require('../models/inventory')

//read inventory
exports.getInventory = (req, res) => {
  InventoryMasak.find()
    .then((inventory) => {
      if (!inventory) return res.status(404).json({ message: 'Bahan tidak ditemukan' })
      return res.json(inventory)
    })
    .catch((err) => console.log(err))
}

//read inventory from name or category
exports.getInventory = (req, res) => {
  const { name, type } = req.query;
  const query = {};

  if (name) {
    query.name = { $regex: new RegExp(name, 'i') }; 
  }

  if (type) {
    query.type = { $regex: new RegExp(type, 'i') }; 
  }

  InventoryMasak.find(query)
    .then((inventory) => {
      if (!inventory || inventory.length === 0) {
        return res.status(404).json({ message: 'No items found' });
      }
      return res.json(inventory);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve inventory' });
    });
};

//create inventory
exports.addInventory = (req, res) => {
  const inventory = new InventoryMasak({
    name: req.body.name,
    desc: req.body.desc,
    type: req.body.type,
    quantity: req.body.quantity,
    qtype: req.body.qtype,
    price: req.body.price,
  })
  inventory.save((err, inventory) => {
    if (err) return res.status(500).json({ error: err })
    return res.json(inventory)
  })
}

//update inventory
exports.updateInventory = (req, res) => {
  const inventoryId = req.params._id;
  const updatedData = {
    name: req.body.name,
    desc: req.body.desc,
    type: req.body.type,
    quantity: req.body.quantity,
    qtype: req.body.qtype,
    price: req.body.price,
  };

  InventoryMasak.findByIdAndUpdate(inventoryId, updatedData, { new: true })
    .then((updatedInventory) => {
      if (!updatedInventory) {
        return res.status(404).json({ message: 'Inventory not found' });
      }
      return res.json(updatedInventory);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update inventory' });
    });
};

//delete inventory
exports.deleteInventory = (req, res) => {
  const inventoryId = req.params._id;

  InventoryMasak.findByIdAndDelete(inventoryId)
    .then((deletedInventory) => {
      if (!deletedInventory) {
        return res.status(404).json({ message: 'Inventory not found' });
      }
      return res.json({ message: 'Inventory deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete inventory' });
    });
};
