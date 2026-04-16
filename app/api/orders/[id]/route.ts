import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { statustype } from "@/types/order";
import { orders } from "@/store/store";
import { messagess } from "@/store/store";
import { Order } from "@/types/order";
import { Status } from "@/types/order";
import { messages } from "@/types/message";
import { Checkstatus } from "@/utils/checkstatus";
export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){
  try{
    const {id}=await params;
  const data:statustype=await req.json()
  console.log(id,data)
  if(!data.status||!Checkstatus(data.status)){
    return NextResponse.json({success:false,message:"Status Invalid"})
  }
  if(!orders.length||!orders.some(data=>data.id===id)){
    return NextResponse.json({success:false,message:"Order not exist"})
  }
  const order=orders.find(data=>data.id===id)
  const messge:messages={
    id:id,
    message:"",
    createdAt:new Date()
  }
  console.log(order)
  if(order){
    console.log("trigger")
  order.status=data.status
  messge.message="Status changes successfull"
  return NextResponse.json({success:true,message:"Status changed successfully"})
  }
  else{
    messge.message="Status changed unsuccessfull"
  }
  messagess.push(messge)
}
catch(error){
    return NextResponse.json({success:false,message:error})
}
}
export async function GET({params}:{params:Promise<{id:string}>}){
  try{
    const {id}=await params
    if(!id){
        return NextResponse.json({success:false,message:"No id given"})
    }
    const order:Order|undefined=orders.find(data=>data.id===id)
    const messge:messages={
      id:id,
      message:"",
      createdAt:new Date()
    } 
    messge.message="Getting order details successfull"
    if(!order){
      messge.message="Getting order details unsuccessfull"
      messagess.push(messge)
      return NextResponse.json({success:false,message:"No order found"})
    }
    messagess.push(messge)
    return NextResponse.json({success:false,order:order})
  }
  catch(error){
    return NextResponse.json({success:false,message:error})
  }
}