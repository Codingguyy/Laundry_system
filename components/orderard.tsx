"use client"
import toast from "react-hot-toast";
import { Triggerfetch } from "@/store/zustand"
import { Triggerdashboard } from "@/store/zustand";
type Status = "RECEIVED" | "PROCESSING" | "READY" | "DELIVERED";

type order_items = {
  garment: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  customerName: string;
  phone: string;
  items: order_items[];
  totalAmount: number;
  status: Status;
  createdAt: string;
  estimatedDeliveryDate?: string;
};

const statusColor = (status: Status) => {
  switch (status) {
    case "RECEIVED":
      return "bg-yellow-100 text-yellow-700";
    case "PROCESSING":
      return "bg-blue-100 text-blue-700";
    case "READY":
      return "bg-purple-100 text-purple-700";
    case "DELIVERED":
      return "bg-green-100 text-green-700";
  }
};

export default function OrderCard({
  order,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: string, status: Status) => void;
}) {
  const fetchh=Triggerfetch(s=>s.count)
  const setfetch=Triggerfetch(s=>s.setcont)
  const triggerdashboard=Triggerdashboard(s=>s.count)
  const settriggerdashboard=Triggerdashboard(s=>s.setcont)
  const handleChange = async (newStatus: Status) => {
    console.log("triggering")
    const response=await fetch(`/api/orders/${order.id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({status:newStatus})
    })
    const data=await response.json()
    if(data.success){
        toast.success("Status changes successfully")
        console.log("status changed")
        onStatusChange(order.id,newStatus)
        setfetch(!fetchh)
        settriggerdashboard(!triggerdashboard)
    }
    else if(data.success===false &&data.message==="Status changes unsuccessfull"){
        toast.error("Wrong status update")
    }
    else if(data.status===false){
      toast.error("An error occurred")
    }
  };

  return (
    <div className="w-full bg-white border shadow-sm rounded-2xl px-5 py-4 flex flex-col gap-3 hover:shadow-md transition">

     
      <div className="flex justify-between items-start">
        
        
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {order.customerName}
          </h2>

          <p className="text-sm text-gray-500">
            📞 {order.phone}
          </p>

          <p className="text-xs text-gray-400">
            Order ID: {order.id}
          </p>
        </div>

        
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ₹{order.totalAmount}
          </p>

          
          <select
          title="..."
            value={order.status}
            onChange={(e) => handleChange(e.target.value as Status)}
            className={`mt-2 px-3 py-1 rounded-full text-xs font-medium border outline-none cursor-pointer ${statusColor(
              order.status
            )}`}
          >
            <option value="RECEIVED">RECEIVED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="READY">READY</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      </div>

      
      <div className="flex flex-wrap gap-2">
        {order.items.slice(0, 3).map((item, idx) => (
          <span
            key={idx}
            className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
          >
            {item.garment} x{item.quantity}
          </span>
        ))}
      </div>

      
      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
        <span>
          Created: {order.createdAt}
        </span>

        <span>
          Delivery:{" "}
          {order.estimatedDeliveryDate
            ? order.estimatedDeliveryDate
            : "Not set"}
        </span>
      </div>
    </div>
  );
}