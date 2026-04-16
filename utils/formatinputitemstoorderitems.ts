import { input_items } from "@/types/order";
import { order_items } from "@/types/order";
import { orders_pricing } from "@/components/orderpricing";
export function Formatinputitemstoorderitems(value:input_items):order_items|"An error"{
    const items_list=Object.keys(orders_pricing)
    if(items_list.includes(value.garment)&&value.quantity>=0){
        const orderitem:order_items={garment:value.garment,quantity:value.quantity,price:orders_pricing[value.garment]}
        return orderitem
    }
    else{
        return "An error"
    }
}