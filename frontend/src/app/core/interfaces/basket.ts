export interface IBasket {
  success: boolean;
  data: IBasketData;
}

export interface IBasketData {
  azots: IBasketAzot[];
  accessories: IBasketAccessory[];
  services: IBasketService[];
  total_price: number;
}

export interface IBasketAzot {
  product_id: number;
  name: string;
  price_type: string;
  price: string;
  quantity: number;
  product: IProduct;
}

export interface IBasketAccessory {
  product_id: number;
  name: string | null;
  price: string;
  quantity: number;
  product: IProduct;
}

export interface IBasketService {
  product_id: number;
  name: string | null;
  price: string;
  quantity: number;
  product: IProduct;
}

export interface IProduct {
  quantity: number;
  id: number;
  title: string;
  type?: string;
  price?: string;
  image: string;
  description: string;
  country?: string;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}
