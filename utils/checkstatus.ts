import { Status } from "@/types/order";
export function Checkstatus(status:Status){
   const statss:Status[]=["DELIVERED","PROCESSING","READY","RECEIVED"]
   return statss.includes(status)?true:false
}