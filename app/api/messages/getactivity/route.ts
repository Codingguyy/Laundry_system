import { NextResponse } from "next/server";
import { messagess } from "@/store/store";
export async function GET(){
   try{
      return NextResponse.json({success:true,messages:messagess})
   }
   catch(error){
      return NextResponse.json({success:false,message:error})
   }
}