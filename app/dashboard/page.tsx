"use client"
import { useEffect, useState } from "react"
import { ClipboardList, IndianRupee, Clock, CheckCircle } from "lucide-react"
import { PackageX } from "lucide-react"
import { Orderss } from "@/store/zustand"
import { Orderdetails } from "@/store/zustand"
import { Triggerdashboard } from "@/store/zustand"
import { Triggermessage } from "@/store/zustand"
import toast from "react-hot-toast"
type Order = {
  id: string
  totalAmount: number
  status: "RECEIVED" | "PROCESSING" | "READY" | "DELIVERED"
}

export default function Dashboard() {
  const orders=Orderss(s=>s.orderss)
  const setorders=Orderss(s=>s.setodrs)
  const orderdetails=Orderdetails(s=>s.ordrdetails)
  const setorderdetails=Orderdetails(s=>s.setordrdetails)
  const triggerdashboard=Triggerdashboard(s=>s.count)
  const settriggerdashboard=Triggerdashboard(s=>s.setcont)
  const settriggermessage=Triggermessage(s=>s.setcont)
  async function fetchOrders() {
    const response = await fetch("/api/orders/createorder",{method:'GET'})
     if (!response.ok) {
    const text = await response.text();
    console.error("API error:", text);
    return;
  }
    const data = await response.json()
    if (data.success) {setorders(data.orders);}
        else if(data.success===false){
    toast.error("An error occurred")}
  }
  async function fetchorderdetails(){
    const response=await fetch("/api/orders/ordersdetails",{method:'GET',headers:{"Content-Type":"application/json"}})
    if (!response.ok) {
    const text = await response.text();
    console.error("API error:", text);
    return;
  } const data=await response.json()
  if(data.success) {setorderdetails(data.ordersdetails);settriggermessage(true)}
  else if(data.success===false){
    toast.error("An error occurred")
    console.log("error")
  }
  }
  useEffect(() => {
    fetchOrders()
    fetchorderdetails()
  }, [triggerdashboard])
  console.log(orderdetails)
  return (
    <div className="w-full h-screen min-h-0 overflow-y-auto bg-gray-50 p-6 space-y-6" style={{fontFamily:"'Robotomono',monospace"}}>

     
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Laundry Dashboard</h1>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Sync
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <ClipboardList className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold text-gray-500">{orderdetails.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <IndianRupee className="text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-bold text-gray-500">₹{orderdetails.totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Clock className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Processing</p>
            <p className="text-xl font-bold text-gray-500">{orderdetails.statusCount.PROCESSING}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-xl font-bold text-gray-500">{orderdetails.statusCount.DELIVERED}</p>
          </div>
        </div>
      </div>

      
      <div className="bg-white p-5 rounded-xl shadow space-y-3">
        <h2 className="text-lg font-semibold text-black">Order Status Breakdown</h2>

        <div className="space-y-2">

          <StatusBar label="RECEIVED" value={orderdetails.statusCount.RECIEVED} />
          <StatusBar label="PROCESSING" value={orderdetails.statusCount.PROCESSING} />
          <StatusBar label="READY" value={orderdetails.statusCount.READY} />
          <StatusBar label="DELIVERED" value={orderdetails.statusCount.DELIVERED} />

        </div>
      </div>

      
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-black mb-3">Recent Orders</h2>

        <div className="space-y-3">
          {orders.length?orders.slice(0, 5).map(order => (
  <div
    key={order.id}
    className="flex items-center justify-between p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
  >
    
    <div className="flex flex-col">
      <span className="text-xs text-gray-400">
        #{order.id.slice(0, 8)}
      </span>

      <span className="font-semibold text-gray-800">
        {order.customerName}
      </span>

      <span className="text-xs text-gray-500">
        {order.phone}
      </span>
    </div>

    
    <div className="hidden md:flex flex-col text-center">
      <span className="text-xs text-gray-400">Items</span>
      <span className="text-sm font-medium text-gray-700">
        {order.items.length}
      </span>
    </div>

    
    <div className="flex flex-col items-end">
      <span className="text-xs text-gray-400">Total</span>
      <span className="font-bold text-green-600">
        ₹{order.totalAmount}
      </span>
    </div>

    
    <div
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        order.status === "DELIVERED"
          ? "bg-green-100 text-green-600"
          : order.status === "PROCESSING"
          ? "bg-yellow-100 text-yellow-600"
          : order.status === "READY"
          ? "bg-blue-100 text-blue-600"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {order.status}
    </div>

    
    <div className="hidden lg:flex flex-col items-end">
      <span className="text-xs text-gray-400">Delivery</span>
      <span className="text-sm text-gray-600">
        {order.estimatedDeliveryDate || "N/A"}
      </span>
    </div>
  </div>
)):<div className="h-[107px] w-full flex items-center justify-center space-x-2 ">
    <PackageX size={37} color="black"/>
    <span className="text-xl text-black">No orders yet</span>
    </div>}
        </div>
      </div>

    </div>
  )
}
function StatusBar({
  label,
  value
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-300 h-2 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${value * 10}px` }} 
        />
      </div>
    </div>
  )
}