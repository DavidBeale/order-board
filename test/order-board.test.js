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
