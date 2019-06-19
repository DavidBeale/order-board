# @bank/order-board

Live Order Board

# Usage

```js

import orderBoard, { BUY, SELL } from '@bank/order-board';

const board = orderBoard();

board.subscribe(summary => {
  console.log(summary) // -->  { BUY: [{price:String, qty:String},...], SELL: [{price:String, qty:String},...]}
})


board.placeOrder({
  userId: 4,
  type: BUY,
  qty: '3.5',
  price: '303.00'
}); // --> { id: String, ... }


board.cancelOrder({
  id: 'ed20b384-e88c-4df2-b2bd-4ffe62c03f55',
  ...
});


board.free();
```

# Assumptions
 - ES Observable is present in the environment (e.g. Polyfill)
 - Price to 2 decimal places
 - Qty to 1 decimal places

# Improvements
 - Drive aggregatation from the Observable steam (i.e. subscribe.filter().map etc)
 - Split BUY/SELL subscription to that only one needs to notified at a time (i.e. A Sell order does not change the BUY summary)
 - Use a deeper data-structure to reduce to interations needed per place/cancel operation



# Install
```shell
npm i @bank/order-board
```

# Development
```shell
npm i
npm t
```
