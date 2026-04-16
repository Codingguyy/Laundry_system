"use client"
import { useRouter } from "next/navigation"
import { CornerRightDown } from "lucide-react"
import { EyeClosed } from "lucide-react"
import { Navigation } from "@/store/zustand"
import { Rnd } from "react-rnd"
export default function QuickNavigation(){
    const router=useRouter()
    const value=Navigation(s=>s.value)
    const setvlue=Navigation(s=>s.setvlue)
    function handlenavigate(value:number){
        if(value===1){
            router.push("/dashboard")
        }
        else if(value===2){
            router.push("/orderssss")
        }
        else if(value===3){
            router.push("createorder")
        }
    }
    
    return (
        <Rnd default={{x:100,y:100,width:200,height:150}}><div className="absolute flex items-center justify-center left-[50%] top-[2%] p-2" style={{fontFamily:"'Robotomono',monospace"}}>
            {value?<div className="flex flex-col items-start py-2 px-6 space-y-2 rounded-md shadow-md bg-white">
            <div className="w-full flex items-center space-x-2 text-md"><span className="text-black">Quick Navigation</span>
                <CornerRightDown size={14} color="black" className="mt-2"/>
                <button className="px-2 text-black ml-auto border border-1 border border-black rounded-md bg-orange-300 hover:shadow-md hover:cursor-pointer" onClick={(e)=>{e.stopPropagation();setvlue(false)}}>Hide</button>
            </div>
            <div className="w-full flex items-center space-x-2">
                <div className="px-2 text-black text-sm flex items-center justify-center rounded-md bg-gray-300 hover:shadow-md hover:cursor-pointer" onClick={(e)=>{e.stopPropagation();handlenavigate(1)}}>Dashboard</div>
                <div className="px-2 text-black text-sm flex items-center justify-center rounded-md bg-gray-300 hover:shadow-md hover:cursor-pointer" onClick={(e)=>{e.stopPropagation();handlenavigate(2)}}>Orders</div>
                <div className="px-2 text-black text-sm flex items-center justify-center rounded-md bg-gray-300 hover:shadow-md hover:cursor-pointer" onClick={(e)=>{e.stopPropagation();handlenavigate(3)}}>Create_order</div>
            </div>
        </div>:<div className="rounded-md text-white py-1 px-2 bg-blue-300 shadow-md" onClick={(e)=>{e.stopPropagation();setvlue(true)}}><EyeClosed size={28} color="black"/></div>}
        </div></Rnd>
    )
}