export interface IBasket {
  success: boolean;
  data: IBasketData;
}

export interface IBasketData {
  azots: IBasketAzot[];
  accessories: IBasketAccessory[];
  services: any[];
  total_price: number;
}

export interface IBasketAzot {
  product_id: number;
  name: string;
  price_type: string;
  price: string;
  quantity: number;
}

export interface IBasketAccessory {
  product_id: number;
  name: any;
  price: string;
  quantity: number;
}
