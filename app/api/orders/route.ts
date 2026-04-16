import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { orders } from "@/store/store";
import { messagess } from "@/store/store";
import { Order } from "@/types/order";
import { messages } from "@/types/message";
export async function GET(req:NextRequest){
   try{
   const {searchParams}=new URL(req.url)
   const status=searchParams.get("status")
   const name=searchParams.get("name")
   const phone=searchParams.get("phone")
   let orderss:Order[]=[]
   if(status){
    orderss=orders.filter(data=>data.status===status)
   }
   else if(name){
    orderss=orders.filter(data=>data.customerName===name)
   }
   else if(phone){
    orderss=orders.filter(data=>data.phone===phone)
   }
   const messge:messages={
    id:"none",
    message:"Getting Filtering orders",
    createdAt:new Date()
   }
   messagess.push(messge)
   return NextResponse.json({success:true,orders:orderss})
}
catch(error){
    return NextResponse.json({success:false,message:error})
}
}