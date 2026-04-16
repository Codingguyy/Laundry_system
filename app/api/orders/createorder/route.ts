import { NextResponse } from "next/server";
import { createorder } from "@/types/order";
import { Order } from "@/types/order";
import { order_items } from "@/types/order";
import { input_items } from "@/types/order";
import { messages } from "@/types/message";
import { Calc_price } from "@/utils/calc_price";
import { Formatinputitemstoorderitems } from "@/utils/formatinputitemstoorderitems";
import { orders } from "@/store/store";
import { messagess } from "@/store/store";
export async function POST(req:Request){
    try{
  const data:createorder=await req.json()
  const {customerName,items,phone}=data
  if(!customerName||!items.length||!phone||items.length===0){
    return Response.json({success:false,message:"Invalid Input"},{status:400})
  }
  const orderitems:order_items[]=[]
  items.forEach((value:input_items)=>{
    const response=Formatinputitemstoorderitems(value)
    if(response==="An error"){
        return Response.json({success:false,message:"Invalid Garment Input"})
    }
    else{
        orderitems.push(response)
    }
  })
  const totalAmount=Calc_price(orderitems)
  const order:Order={
    id:crypto.randomUUID(),
    customerName:customerName,
    phone:phone,
    items:orderitems,
    totalAmount:totalAmount,
    status:"RECEIVED",
    createdAt:new Date().toLocaleDateString(),
    estimatedDeliveryDate:new Date(Date.now()+1000*60*60*24*2).toLocaleDateString(),
  }
  const messge:messages={
    id:order.id,
    message:"New order created",
    createdAt:new Date()
  }
  orders.push(order)
  messagess.push(messge)
  console.log(orders)
  return Response.json({success:data,order:order})
}
catch(error){
    return Response.json({success:false,error:error})
}
}
export async function GET():Promise<Response>{
  try{
    const messge:messages={
      id:"none",
      message:"Getting all orders successfull",
      createdAt:new Date()
    }
    messagess.push(messge)
    return Response.json({success:true,orders:orders})
  }
  catch(error){
    return NextResponse.json({success:false,message:error})
  }
}