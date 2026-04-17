"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
export default function Navigate(){
    const router=useRouter()
    useEffect(()=>{
        router.push("/")
        toast.success("For navigation use quick navigation icon at top middle")
    },[])
    return(
     <></>
    )
}