# @bank/order-board

Live Order Board

# Usage

```js

import orderBoard, { BUY, SELL } from '@bank/order-board';

const board = orderBoard();

board.subscribe(summary => {
  console.log(summary) // -->  { BUY: [order summaries], SELL: [order summaries]}
})

board.placeOrder({
  userId: 4,
  type: BUY,
  qty: '3.5',
  price: '303.00'
});

board.cancelOrder({
  id: 'ed20b384-e88c-4df2-b2bd-4ffe62c03f55',
  ...
});

```


# API


# Assumptions
 - ES Observable is present in the environment (e.g. Polyfill)


# Install
```shell
npm i @bank/order-board
```

# Development
```shell
npm i
npm t
```
