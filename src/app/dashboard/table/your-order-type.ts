/*
|-----------------------------------------
| setting up YourOrderType for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: DaaUK, October, 2023
|-----------------------------------------
*/
export type yourOrdersType = {
  id: string | number;
  name: string;
  color: string;
  price: string | number;
  size: string;
  img: string;
  productUrl: string;
  width: string;
  orderId: string;
  date: string;
  quantity: string | number;
  status: string;
};
