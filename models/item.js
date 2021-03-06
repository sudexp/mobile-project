class Item {
  constructor(
    id,
    brand,
    price,
    color,
    material,
    closure_method,
    description,
    imgUrl,
  ) {
    this.id = id;
    this.brand = brand;
    this.price = price;
    this.color = color;
    this.material = material;
    this.closure_method = closure_method;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

export default Item;
