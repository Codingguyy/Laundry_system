import { create } from "zustand"
import { input_items, Ordersdetails } from "@/types/order"
import {Garment} from '@/types/order'
import { Order } from "@/types/order"
import { Status } from "@/types/order"
import { messages as message } from "@/types/message"
export type create_order={
  name:string,
  phone_no:string,
  input_items:input_items[],
  setname:(value:string)=>void,
  setphone_no:(value:string)=>void,
  setinput_items:(value:input_items)=>void,
  removeinput_items:(garment:Garment,quanity:number)=>void
}
export type modal={
    value:boolean,
    setvlue:(value:boolean)=>void
}
export type garment_value={
    value:Garment,
    setvlue:(value:Garment)=>void,
    quantity:number,
    setquantity:(value:number)=>void
}
export type orders={
   orderss:Order[],
   setodrs:(value:Order[])=>void,
   setupdatestatus:(id:string,status:Status)=>void,
}
export type orders_page={
    search:string,
    setsearch:(value:string)=>void,
    filterstatus:Status,
    setfilterstatus:(value:Status)=>void
}
export type triggercount={
    count:boolean,
    setcont:(value:boolean)=>void
}
export type orderdetails={
    ordrdetails:Ordersdetails,
    setordrdetails:(value:Ordersdetails)=>void,
}
export type messages={
    messge:message[],
    setmessage:(value:message[])=>void,
    removemessage:(value:number)=>void
}
export type loading={
    load:boolean,
    setload:(value:boolean)=>void
}
export const Create_order=create<create_order>((set)=>({
    name:"",
    phone_no:"",
    input_items:[],
    setname:(value)=>set(({name:value})),
    setphone_no:(value)=>set({phone_no:value}),
    setinput_items:(value)=>set((v)=>({input_items:[...v.input_items,value]})),
    removeinput_items:(garment,quantity)=>set((v)=>({input_items:v.input_items.filter(data=>data.garment!==garment&&data.quantity!==quantity)}))
}))
export const Modal=create<modal>((set)=>({
    value:false,
    setvlue:(value)=>set(({value:value}))
}))
export const Garment_value=create<garment_value>((set)=>({
    value:"Pants",
    setvlue:(value)=>set({value:value}),
    quantity:0,
    setquantity:(value)=>set({quantity:value})
}))
export const Orderss=create<orders>((set)=>({
    orderss:[],
    setodrs:(value)=>set((v)=>({orderss:value})),
    setupdatestatus:(id,status)=>set((v)=>({orderss:v.orderss.map((data)=>data.id===id?{...data,status:status}:data)}))
}))
export const Orders_page=create<orders_page>((set)=>({
    search:"",
    setsearch:(value)=>set({search:value}),
    filterstatus:"RECEIVED",
    setfilterstatus:(value)=>set({filterstatus:value})
}))
export const Navigation=create<modal>((set)=>({
    value:false,
    setvlue:(value)=>set(({value:value}))
}))
export const Triggercount=create<triggercount>((set)=>({
    count:false,
    setcont:(value)=>set({count:value})
}))
export const Triggerfetch=create<triggercount>((set)=>({
    count:false,
    setcont:(value)=>set({count:value})
}))
export const Orderdetails=create<orderdetails>((set)=>({
    ordrdetails:{
        totalRevenue:0,
        totalOrders:0,
        statusCount:{
            DELIVERED:0,
            PROCESSING:0,
            READY:0,
            RECIEVED:0,
        }
    },
    setordrdetails:(value)=>set({ordrdetails:value})
}))
export const Triggerdashboard=create<triggercount>((set)=>({
    count:false,
    setcont:(value)=>set({count:value})
}))
export const Message=create<messages>((set)=>({
    messge:[],
    setmessage:(value)=>set((v)=>({messge:value})),
    removemessage:(value)=>set((v)=>({messge:v.messge.filter((data,index)=>index!==value)}))
}))
export const Triggermessage=create<triggercount>((set)=>({
    count:false,
    setcont:(value)=>set({count:value})
}))
export const Mainorders=create<orders>((set)=>({
    orderss:[],
    setodrs:(value)=>set({orderss:value}),
    setupdatestatus:(id,status)=>set((v)=>({orderss:v.orderss.filter(data=>data.id===id?{...data,status:status}:data)}))
}))
export const Dashboardloading=create<loading>((set)=>({
    load:false,
    setload:(value)=>set({load:value})
}))
export const Ordersload=create<loading>((set)=>({
    load:false,
    setload:(value)=>set({load:value})
}))