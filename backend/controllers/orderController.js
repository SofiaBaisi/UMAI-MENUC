const orders = [
    { id: 1234, userId: 1, items: [1], status: 'pending' },
    { id: 1235, userId: 2, items: [2], status: 'pending' },
    { id: 1236, userId: 3, items: [3], status: 'pending' },
  ];
  
  exports.getOrders = (req, res) => {
    res.json(orders);
  };
  
  exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = orders.find(o => o.id === parseInt(id));
    if (order) {
      order.status = status;
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  };
  