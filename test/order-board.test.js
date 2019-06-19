import test from 'ava';

import orderBoard from '..';

test('Place an order', async (t) => {
  const board = orderBoard();

  const orders = await new Promise((resolve) => {
    board.subscribe((orders) => {
      resolve(orders);
    });

    board.placeOrder({
      userId: 4,
      type: 'BUY',
      qty: '3.5',
      price: '303.00'
    });
  });

  t.is(orders.length, 1);
});


test('Cancel an order', async (t) => {
  const board = orderBoard();

  const orders = await new Promise((resolve) => {
    const order = board.placeOrder({
      userId: 4,
      type: 'BUY',
      qty: '3.5',
      price: '303.00'
    });

    board.placeOrder({
      userId: 4,
      type: 'BUY',
      qty: '2.5',
      price: '300.00'
    });

    board.subscribe((orders) => {
      resolve(orders);
    });

    board.cancelOrder(order);
  });

  t.is(orders.length, 1);
  t.is(orders[0].price, '300.00');
});

test('Free the board', async (t) => {
  const board = orderBoard();

  const orders = await new Promise((resolve) => {
    board.placeOrder({
      userId: 4,
      type: 'BUY',
      qty: '3.5',
      price: '303.00'
    });

    board.placeOrder({
      userId: 4,
      type: 'BUY',
      qty: '2.5',
      price: '300.00'
    });

    board.subscribe((orders) => {
      resolve(orders);
    });

    board.free();
  });

  t.is(orders.length, 0);
});
