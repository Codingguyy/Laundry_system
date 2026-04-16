"use client"
import { Create_order } from "@/store/zustand"
import { Modal } from "@/store/zustand"
import { Garment_value } from "@/store/zustand"
import { Triggerfetch } from "@/store/zustand"
import { Triggerdashboard } from "@/store/zustand"
import { Plus } from "lucide-react"
import { Check } from "lucide-react"
import { X } from "lucide-react"
import { Shirt } from "lucide-react"
import Dropdown from "@/components/dropdown"
import { garment_value } from "@/types/utils"
import { Garment, input_items } from "@/types/order"
import { createorder } from "@/types/order"
import toast from "react-hot-toast"
import { orders } from "@/store/store"
export default function Createorder(){
    const name=Create_order(s=>s.name)
    const phone_no=Create_order(s=>s.phone_no)
    const setname=Create_order(s=>s.setname)
    const setphone_no=Create_order(s=>s.setphone_no)
    const items=Create_order(s=>s.input_items)
    const setinput_items=Create_order(s=>s.setinput_items)
    const setremoveinput_items=Create_order(s=>s.removeinput_items)
    const modal=Modal(s=>s.value)
    const setmdal=Modal(s=>s.setvlue)
    const garment_value=Garment_value(s=>s.value)
    const setgarment_value=Garment_value(s=>s.setvlue)
    const quantity=Garment_value(s=>s.quantity)
    const setquantity=Garment_value(s=>s.setquantity)
    const fetchh=Triggerfetch(s=>s.count)
    const setfetch=Triggerfetch(s=>s.setcont)
    const triggerdashboard=Triggerdashboard(s=>s.count)
    const settriggerdashboard=Triggerdashboard(s=>s.setcont)
    const garmentOptions :garment_value[]= [
  { label: "Shirt", value: "Shirt" },
  { label: "TShirt", value: "TShirt" },
  { label: "Pants", value: "Pants" },
  { label: "Jeans", value: "Jeans" },
  { label: "Saree", value: "Saree" },
  { label: "Kurta", value: "Kurta" },
  { label: "Jacket", value: "Jacket" },
  { label: "Blazer", value: "Blazer" },
  { label: "Sweater", value: "Sweater" },
  { label: "Bedsheet", value: "Bedsheet" },
];
    function handlemodal(){
        setmdal(!modal)
    }
    function handleaddgarments(){
        if(garment_value&&Number(quantity)){
        const itemss:input_items={garment:garment_value,quantity:quantity}
        setinput_items(itemss)
        }
    }
    function handleremoveitems(garment:Garment,quanity:number){
        setremoveinput_items(garment,quantity)
    }
    async function handlecreateorder(){
        if(name&&phone_no&&items.length){
        const order:createorder={
            customerName:name,
            phone:phone_no,
            items:items
        }
        const response=await fetch("/api/orders/createorder",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(order)
        })
        if (!response.ok) {
    const text = await response.text();
    console.error("API error:", text);
    return;
  }
        const data=await response.json()
        if(data.success){
            toast.success("Order Successfully created")
            setfetch(false)
            settriggerdashboard(!triggerdashboard)
        }
        else if(!data.success&&(data.message==="Invalid Input"||data.message==="Invalid Garment Input")){
            toast.error("Invalid Input")
        }
        else{
            toast.error("An error occured")
        }
    }
    else{
        toast.error("Input properly")
    }
    }
    return(
        <div className="max-w-9xl w-full h-full flex items-center justify-center bg-[#F5F2F2]" style={{fontFamily:"'Robotomono',monospace"}}>
            <div className="flex flex-col items-start rounded-[30px] shadow-md bg-white lg:w-[58%] lg:h-[91%] lg:py-6 lg:px-6 lg:space-y-2">
                <div className="w-full flex items-center font-semibold text-xl text-black">
                    <span>Create_order</span>
                    <button className="text-black bg-blue-300 rounded-md border border-1 border border-black text-sm ml-auto py-1 px-2 hover:shadow-md hover:cursor-pointer" onClick={(e)=>{e.stopPropagation();handlecreateorder()}}>Create Order</button>
                </div>
                <label htmlFor="Name" className="text-black text-md mt-2">Custmore_Name:</label>
                <input id="Name" value={name} className="w-[73%] px-4 py-2 mb-4 text-gray-500 border border-gray-300 rounded-lg 
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  transition" placeholder="Enter customer name..." onChange={(e)=>{e.stopPropagation();setname(e.target.value)}}/>
                <label htmlFor="Phone_no" className="text-black text-md">Phone_no:</label>
                <input id="Phone_no" value={phone_no} className="w-[73%] px-4 py-2 text-gray-500 mb-4 border border-gray-300 rounded-lg 
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  transition placeholder:text-gray" placeholder="Enter customer Phone_no..." onChange={(e)=>{e.stopPropagation();setphone_no(e.target.value)}}/>
  <div className="text-black text-xl flex items-center space-x-2"><span>Garments</span>
    <Plus size={23} color="black"/>
  </div>
        <div className="w-full relative flex-1 flex space-y-2 flex-col items-center py-2 px-6">
            <div className="w-full flex items-center">
                <span className="text-black text-md">{items.length?`Total garments-${items.length}`:"No garments yet"}</span>
                <button className="py-1 px-2 font-semibold text-black flex items-center space-x-2 bg-blue-300 rounded-md ml-auto border border-1 border border-black hover:shadow-md hover:cursor-pointer" onClick={(e)=>{e.stopPropagation();handlemodal()}}><Plus size={14} color="black"/><span>Garments</span></button>
            </div>
            {modal?<div className="absolute flex items-center rounded-md bg-white shadow-md px-6 py-2">
                <span className="text-black text-md mr-1">Garment:</span><Dropdown value={garment_value} onChange={setgarment_value} options={garmentOptions}/>
                <span className="text-black text-md ml-6">Quantity:</span>
                <input value={quantity} className="py-2 w-[147px] border border-2 border border-gray rounded-md ml-1 text-gray-500 text-sm px-2" placeholder="Enter Quantity..." onChange={(e)=>{e.stopPropagation();setquantity(Number(e.target.value))}}/>
                <button className="py-2 px-2 text-black border border-1 border border-black text-sm rounded-md bg-blue-300 hover:shadow-md hover:cursor-pointer ml-6" onClick={(e)=>{e.stopPropagation();handleaddgarments()}}><Check size={14} color="black"/></button>
                <button className="py-2 px-2 text-black border border-1 border border-black text-sm rounded-md bg-red-300 hover:shadow-md hover:cursor-pointer ml-6" onClick={(e)=>{e.stopPropagation();setmdal(false)}}><X size={14} color="white"/></button>
            </div>:<></>}
            <div className="w-full max-h-[207px] overflow-y-auto flex flex-col items-center border border-black no-scrollbar rounded-[30px] py-2 px-6">
    
    {items.length?items.map((data, idx) => (
      <div
        key={idx}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border rounded-lg shadow-sm mb-2"
      >
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Garment</span>
          <span className="font-medium text-gray-900">{data.garment}</span>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex flex-col items-end ml-6">
          <span className="text-xs text-gray-500">Quantity</span>
          <span className="font-medium text-gray-900">{data.quantity}</span>
        </div>
        <div className="flex items-center justify-center p-1 bg-red-300 ml-6 rounded-md border border-1 border border-black" onClick={(e)=>{e.stopPropagation();handleremoveitems(data.garment,data.quantity)}}>
            <X size={14} color="white"/>
        </div>
      </div>
    )):<div className="h-[207px] flex items-center justify-center">
            <Shirt size={43} color="black"/>
            <span className="ml-6 text-md text-black">No garments added yet</span>
        </div>}
    
  </div>
        </div>
            </div>
            
        </div>
    )
}