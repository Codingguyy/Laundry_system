import { NextResponse } from "next/server";
import { orders } from "@/store/store";
import { messagess } from "@/store/store";
import { Ordersdetails } from "@/types/order";
import { messages } from "@/types/message";
export async function GET(){
    try{
   let ordersdetails:Ordersdetails={ 
    totalRevenue:0,
    totalOrders:0,
    statusCount:{
        RECIEVED:0,
        PROCESSING:0,
        READY:0,
        DELIVERED:0
    }
   }

   if(!orders.length){
    return NextResponse.json({success:false,message:"No order yet"})
   }  
   orders.forEach((value)=>{
    if(value.status==="DELIVERED"){
    ordersdetails.totalRevenue+=value.totalAmount
    ordersdetails.statusCount.DELIVERED+=1
    }
    if(value.status==="PROCESSING"){
        ordersdetails.statusCount.PROCESSING+=1
    }
    if(value.status==="READY"){
        ordersdetails.statusCount.READY+=1
    }
    if(value.status==="RECEIVED"){
        ordersdetails.statusCount.RECIEVED+=1
    }
    })
    const messge:messages={
        id:"none",
        message:"Getting Filtering orders",
        createdAt:new Date()
    }
    messagess.push(messge)
    ordersdetails.totalOrders=orders.length
   return NextResponse.json({success:true,ordersdetails:ordersdetails})
   }
   catch(error){
    return NextResponse.json({success:false,message:error})
   }
}