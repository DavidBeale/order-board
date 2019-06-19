import uuid from 'uuid/v4';


export default function orderBoard() {
  const orders = new Map();
  let observer;

  const board = new Observable((obs) => {
    observer = obs;
  });


  board.placeOrder = (order) => {
    const id = uuid();

    orders.set(id, {
      ...order,
      id
    });

    update();

    return orders.get(id);
  };


  board.cancelOrder = (order) => {
    orders.delete(order.id);
    update();
  };


  board.free = () => {
    orders.clear();
    update();
  }


  function update() {
    if (!observer) return;

    const summary = Array.from(orders.values());
    observer.next(summary);
  }

  return board;
}
