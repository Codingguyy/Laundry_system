"use client"

import { useState } from "react"
import { useEffect } from "react"
import { Rnd } from "react-rnd"
import { MessageSquare, X } from "lucide-react"
import { Message } from "@/store/zustand"
import { Triggerdashboard } from "@/store/zustand"
import { Triggermessage } from "@/store/zustand"
import toast from "react-hot-toast"
type Message = {
  id: string
  message: string
  createdAt: string
}

export default function ActivityFloatingPanel() {
  const [open, setOpen] = useState(true)
  const [count,setcont]=useState(0)
  const messages=Message(s=>s.messge)
  const setmessages=Message(s=>s.setmessage)
  const triggerdashboard=Triggerdashboard(s=>s.count)
  const triggermessage=Triggermessage(s=>s.count)
  async function handlefetchmessages(){
    const response=await fetch("/api/messages/getactivity",
        {method:'GET', 
        headers:{
                "Content-Type":"application/json",
            },
        })
        if (!response.ok) {
        const text = await response.text();
        console.error("API error:", text);
        return;
        }
        const data=await response.json()
        if(data.success){setmessages(data.messages);toast.success("Fetching successfull")}
        else if(data.success===false){
          //  toast.error("An error occurred")
        }
        setcont(v=>v+1)
  }
  useEffect(()=>{
    
    handlefetchmessages()
    console.log("triggeringgg")
    
    return ()=>{setcont(2)}
  },[triggermessage])
  console.log(messages)
  return (
    <>
    {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          <MessageSquare size={20} />
        </button>
      )}
      {open && (
        <Rnd
          default={{
            x: 800,
            y: 300,
            width: 320,
            height: 320,
          }}
          bounds="window"
        >
          <div className="w-full h-full bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 cursor-move">
              <span className="font-semibold text-sm text-black">Activity</span>
              <button onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
              {messages.length ? (
                messages.map((log,index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-2 rounded-md text-gray-700"
                  >
                    <p className="text-black text-xs">{log.message}</p>
                    <span className="text-[10px] text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center mt-10">
                  No activity yet
                </p>
              )}
            </div>
          </div>
        </Rnd>
      )}
    </>
  )
}