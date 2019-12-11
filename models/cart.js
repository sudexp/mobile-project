class CartItem {
  constructor(quantity, orderItemId, itemId, itemPrice, itemBrand, sum) {
    this.quantity = quantity;
    this.orderItemId = orderItemId;
    this.itemId = itemId;
    this.itemPrice = itemPrice;
    this.itemBrand = itemBrand;
    this.sum = sum;
  }
}

export default CartItem;
