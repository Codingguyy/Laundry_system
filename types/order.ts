export type Order = {
  id: string;

  customerName: string;
  phone: string;

  items: order_items[];

  totalAmount: number;

  status: Status,

  createdAt: string;
  estimatedDeliveryDate?: string; 
};
export type createorder={
    customerName: string;
  phone: string;

  items:input_items[];
}
export type input_items={
  garment:Garment,
  quantity:number
}
export type order_items={
  garment:Garment,
  quantity:number,
  price:number
}
export type Garment =
  | "Shirt"
  | "TShirt"
  | "Pants"
  | "Jeans"
  | "Saree"
  | "Kurta"
  | "Jacket"
  | "Blazer"
  | "Sweater"
  | "Bedsheet";
export type Status="RECEIVED" | "PROCESSING" | "READY" | "DELIVERED";
export type statustype={status:Status}
export type Ordersdetails={
  totalRevenue:number,
  totalOrders:number,
  statusCount:{
    DELIVERED:number,
    PROCESSING:number,
    READY:number,
    RECIEVED:number
  }
}