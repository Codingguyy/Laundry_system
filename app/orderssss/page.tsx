"use client"
import { ReactNode, useEffect } from "react"
import { useRef } from "react"
import { CornerRightDown } from "lucide-react"
import { PackageX } from "lucide-react"
import Dropdown from "@/components/dropdown"
import OrderCard from "@/components/orderard"
import { Orders_page } from "@/store/zustand"
import { Orderss } from "@/store/zustand"
import { Triggercount } from "@/store/zustand"
import { Triggerfetch } from "@/store/zustand"
import { Triggerdashboard } from "@/store/zustand"
import { Mainorders } from "@/store/zustand"
import { Status } from "@/types/order"
import toast from "react-hot-toast"

export default function Ordersss(){
    const ref = useRef<ReturnType<typeof setTimeout> | null>(null)
    const searchref = useRef<ReturnType<typeof setTimeout> | null>(null)

    const filterstatus = Orders_page(s => s.filterstatus)
    const setfilterstatus = Orders_page(s => s.setfilterstatus)
    const search = Orders_page(s => s.search)
    const setsearch = Orders_page(s => s.setsearch)

    const orderss = Orderss(s => s.orderss)
    const setorders = Orderss(s => s.setodrs)
    const setorderstatus = Orderss(s => s.setupdatestatus)
    const count=Triggercount(s=>s.count)
    const setcont=Triggercount(s=>s.setcont)
    const fetchh=Triggerfetch(s=>s.count)
    const setfetch=Triggerfetch(s=>s.setcont)
    const triggerdashboard=Triggerdashboard(s=>s.count)
    const settriggerdashboard=Triggerdashboard(s=>s.setcont)
    const mainorders=Mainorders(s=>s.orderss)
    const setmainorders=Mainorders(s=>s.setodrs)
    const setmainorderstatus=Mainorders(s=>s.setupdatestatus)
    const options: { value: Status, label: Status }[] = [
        { value: "DELIVERED", label: "DELIVERED" },
        { value: "PROCESSING", label: "PROCESSING" },
        { value: "READY", label: "READY" },
        { value: "RECEIVED", label: "RECEIVED" }
    ]

    async function handlegetorders(){
        const response = await fetch("/api/orders/createorder", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await response.json()

        if (!response.ok) {
            const text = await response.text()
            console.error("API error:", text)
            return
        }

        if(data.success){
            setorders(data.orders)
            setmainorders(data.orders)
        }
        else if(data.success === false){
            toast.error("An error occured")
        }
    }

    function handlesync(){
        handlegetorders()
    }

    function handlefilter(){
        if(ref.current){
            clearTimeout(ref.current)
        }

        ref.current = setTimeout(() => {
            handletriggerfilter(filterstatus)
            toast.success("Successfully send")
        }, 1500)
    }

    async function handletriggerfilter(status: Status){
        const response = await fetch(`/api/orders?status=${status}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await response.json()

        if(data.success){
            setorders(data.orders)
            setcont(false)
            settriggerdashboard(!triggerdashboard)
        }
        else if(data.success === false){
            toast.error("An error occurred")
        }
    }

    function handlesearchvalue(value: string){
        setsearch(value)

        if(searchref.current){
            clearTimeout(searchref.current)
        }

        searchref.current = setTimeout(() => {
            handlesearchfilter(value)
            toast.success("Successfully send")
        }, 1100)
    }

    async function handlesearchfilter(value: string){
        let checkname = false
        let checkphone = false

        if(mainorders.length){
            if(mainorders.find(data => data.customerName === value)){
                checkname = true
            }
            else if(mainorders.find(data => data.phone === value)){
                checkphone = true
            }
        }

        if(checkname || checkphone){
            const response = await fetch(
                `/api/orders?${getqueryparams(checkname, checkphone, value)}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (!response.ok) {
                const text = await response.text()
                console.error("API error:", text)
                return
            }

            const data = await response.json()

            if(data.success){
                setorders(data.orders)
                settriggerdashboard(!triggerdashboard)
            }
            else if(data.success === false){
                toast.error("An error occurred")
            }
        }
        else{
            toast.error("Enter valid input")
        }
    }

    function getqueryparams(checkname: boolean, checkphone: boolean, value: string){
        if(checkname){
            return `name=${value}`
        }
        else if(checkphone){
            return `phone=${value}`
        }
        return ""
    }

    useEffect(() => {
        if(count){
        handlefilter()
        }
    }, [filterstatus])
    useEffect(()=>{
        handlegetorders()
    },[fetchh])
    console.log(orderss)
    return(
        <div className="max-w-9xl w-screen h-screen overflow-y-auto flex flex-col items-center bg-white space-y-11 px-2 py-2" style={{fontFamily:"'Robotomono',monospace"}}>
            <div className="w-full flex items-center space-x-2 py-2 px-6">
                <span className="text-3xl text-black">Orders List</span>
                <CornerRightDown size={23} color="black" className="mt-2"/>
                <button className="py-1 px-2 text-black ml-auto border border-1 border border-black rounded-md bg-blue-300" onClick={(e)=>{e.stopPropagation();handlesync()}}>Sync</button>
            </div>

            <div className="w-full flex items-center space-x-6 px-6">
                <span className="text-md text-black">Filter By status:</span>
                <Dropdown options={options} value={filterstatus} onChange={setfilterstatus}/>

                <span className="text-md text-black ml-auto">{`Filter (Other parameters):`}</span>
                <input
                    value={search}
                    className="py-2 px-2 w-[23%] border border-1 text-gray-400 text-md border border-gray-500 rounded-md"
                    placeholder="Enter parameters value..."
                    onChange={(e) => {
                        e.stopPropagation()
                        handlesearchvalue(e.target.value)
                    }}
                />
            </div>
            <div className="w-full flex-1 flex flex-col items-center space-y-5 px-2">
                {orderss.length?orderss.map(order =>
                    <OrderCard
                        key={order.id}
                        order={order}
                        onStatusChange={setorderstatus}
                    />
                ):<div className="mt-28 flex items-center justify-start space-x-2">
                    <PackageX size={73} color="black"/>
                    <span className="text-bold text-3xl text-black">No orders</span>
                </div>}
            </div>
        </div>
    )
}