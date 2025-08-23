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
  price_type_id: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    type: string;
    image: string;
    description: string;
    country: string;
    status: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
  price_types: {
    id: number;
    azot_id: number;
    name: string;
    price: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IBasketAccessory {
  product_id: number;
  name: null | string;
  price: string;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: string;
    image: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
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

export interface ILocalBasket {
  azots: IBasketAzot[];
  accessories: IBasketAccessory[];
  total_count: number;
  total_price: number;
}
