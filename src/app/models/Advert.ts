export class Advert {
  id: number;
  title: string;
  price: number;
  address: string;
  phone: number;
  discription: string;
  // userId: number;

  constructor(title: string, price: number, address: string, phone: number, discription: string) {
    this.title = title;
    this.price = price;
    this.address = address;
    this.phone = phone;
    this.discription = discription;
    // this.userId = userId;
  }
}
