export interface OrderInterface {
  id?: number;
  products: OrderProductInterface[];
  userid: number;
  status: string;
}
export interface OrderProductInterface {
  product_id: number;
  quantity: number;
}
