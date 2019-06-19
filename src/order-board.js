import uuid from 'uuid/v4';
import { BUY, SELL } from './OrderTypes';


export { BUY, SELL } from './OrderTypes';

export default function orderBoard() {
  const orders = {
    [BUY]: new Map(),
    [SELL]: new Map()
  };
  let observer;

  const board = new Observable((obs) => {
    observer = obs;
  });


  board.placeOrder = (order) => {
    const id = uuid();

    orders[order.type].set(id, {
      ...order,
      id
    });

    update();

    return orders[order.type].get(id);
  };


  board.cancelOrder = (order) => {
    orders[order.type].delete(order.id);
    update();
  };


  board.free = () => {
    orders[BUY].clear();
    orders[SELL].clear();
    update();
  };


  function update() {
    if (!observer) return;

    const summary = {
      [BUY]: Array.from(orders[BUY].values()),
      [SELL]: Array.from(orders[SELL].values())
    };

    observer.next(summary);
  }

  return board;
}
