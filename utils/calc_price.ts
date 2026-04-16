import { order_items } from "@/types/order";
export  function Calc_price(value:order_items[]):number{
    let totalAmount=0
    value.forEach((value)=>{
        totalAmount+=value.price
    })
    return totalAmount
}