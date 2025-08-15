export interface ILogin {
  tg_id: string;
  username?: string;
  phone?: string;
  address?: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  tg_id: string;
  phone: string;
  username: string;
  address: string;
  updated_at: string;
  created_at: string;
  id: number;
}
