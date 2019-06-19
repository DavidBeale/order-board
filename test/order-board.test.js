import test from 'ava';

import orderBoard, { BUY, SELL } from '..';

test('Place a BUY order', async (t) => {
  const board = orderBoard();

  const summary = await new Promise((resolve) => {
    board.subscribe((summary) => {
      resolve(summary);
    });

    board.placeOrder({
      userId: 4,
      type: BUY,
      qty: '3.5',
      price: '303.00'
    });
  });

  t.is(summary[BUY].length, 1);
  t.is(summary[SELL].length, 0);
});


test('Place a SELL order', async (t) => {
  const board = orderBoard();

  const summary = await new Promise((resolve) => {
    board.subscribe((summary) => {
      resolve(summary);
    });

    board.placeOrder({
      userId: 4,
      type: SELL,
      qty: '3.5',
      price: '303.00'
    });
  });

  t.is(summary[BUY].length, 0);
  t.is(summary[SELL].length, 1);
});


test('Cancel an order', async (t) => {
  const board = orderBoard();

  const summary = await new Promise((resolve) => {
    const order = board.placeOrder({
      userId: 4,
      type: BUY,
      qty: '3.5',
      price: '303.00'
    });

    board.placeOrder({
      userId: 4,
      type: BUY,
      qty: '2.5',
      price: '300.00'
    });

    board.subscribe((summary) => {
      resolve(summary);
    });

    board.cancelOrder(order);
  });

  t.is(summary[BUY].length, 1);
  t.is(summary[BUY][0].price, '300.00');
});


test('Free the board', async (t) => {
  const board = orderBoard();

  const summary = await new Promise((resolve) => {
    board.placeOrder({
      userId: 4,
      type: BUY,
      qty: '3.5',
      price: '303.00'
    });

    board.placeOrder({
      userId: 4,
      type: SELL,
      qty: '2.5',
      price: '300.00'
    });

    board.subscribe((summary) => {
      resolve(summary);
    });

    board.free();
  });

  t.is(summary[BUY].length, 0);
  t.is(summary[SELL].length, 0);
});


test('Aggregate orders by Price', async (t) => {
  const board = orderBoard();

  const summary = await new Promise((resolve) => {
    board.placeOrder({
      userId: 4,
      type: BUY,
      qty: '3.5',
      price: '303.00'
    });

    board.placeOrder({
      userId: 7,
      type: BUY,
      qty: '1.5',
      price: '306.00'
    });

    board.subscribe((summary) => {
      resolve(summary);
    });

    board.placeOrder({
      userId: 2,
      type: BUY,
      qty: '1.5',
      price: '303.00'
    });
  });

  t.is(summary[BUY].length, 2);
  t.is(summary[SELL].length, 0);
  t.deepEqual(summary[BUY], [
    { price: '306.00', qty: '1.5' },
    { price: '303.00', qty: '5.0' }
  ]);
});
