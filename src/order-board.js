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
  };


  board.cancelOrder = (order) => {
    orders.delete(order.id);
    update();
  };


  board.free = () => {
    orders.clear();
  }


  function update() {
    const summary = Array.from(orders);
    observer.next(summary);
  }

  return board;
}
