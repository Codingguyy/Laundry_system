import { Status } from "@/types/order";
const statusarray:Status[]=["RECEIVED","PROCESSING","READY","DELIVERED"]
export function Checkstatusflow(prevalue:Status,value:Status){
   const previndex:number=statusarray.indexOf(prevalue)
   const index:number=statusarray.indexOf(value)
   if(index>previndex){
    return true
   }
   else{
    return false
   }
}