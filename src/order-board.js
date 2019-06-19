import uuid from 'uuid/v4';
import Big from 'big.js';
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
      id,
      qty: Big(order.qty),
      price: Big(order.price)
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
      [BUY]: aggregate(orders[BUY].values(), priceDesc),
      [SELL]: aggregate(orders[SELL].values(), priceAsc)
    };

    observer.next(summary);
  }

  return board;
}


function aggregate(orders, sort) {
  const priceMap = new Map();

  Array.from(orders).forEach((order) => {
    const priceKey = order.price.toFixed(2);
    if (priceMap.has(priceKey)) {
      priceMap.set(priceKey, {
        price: order.price,
        qty: priceMap.get(priceKey).qty.plus(order.qty)
      });
    } else {
      priceMap.set(priceKey, {
        price: order.price,
        qty: order.qty
      });
    }
  });

  return Array.from(priceMap.values()).sort(sort).map(summaryOrder => ({
    price: summaryOrder.price.toFixed(2),
    qty: summaryOrder.qty.toFixed(1)
  }));
}

const priceAsc = (a, b) => a.price.minus(b.price);
const priceDesc = (a, b) => b.price.minus(a.price);
