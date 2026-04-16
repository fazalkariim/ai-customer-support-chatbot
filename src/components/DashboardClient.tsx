'use client'

import axios from "axios"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


function DashboardClient ({ownerId}:{ownerId:string}) {
    const navigate=useRouter()
    const [businessName, setBusinessName]=useState("")
    const [supportEmail,setSupportEmail] = useState("")
    const [knowledge, setKnowledge] = useState("")
    const[loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSettings=async ()=>{
      console.log("OWNER ID FRONTEND:", ownerId); 

        setLoading(true)
        try {
            const result = await axios.post("/api/settings",{ownerId,businessName,supportEmail,knowledge})
            console.log(result.data)
            setLoading(false)
            setSaved(true)
            setTimeout(() => {setSaved(false)}, 3000);

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
      if(ownerId){
        const handleGetDetails = async ()=>{
          try {
            const result = await axios.post("/api/settings/get",{ownerId})
            setBusinessName(result.data.businessName)
            setSupportEmail(result.data.supportEmail)
            setKnowledge(result.data.knowledge)
            
        } catch (error) {
            console.log(error)
            
        }

        }
        handleGetDetails()
      }
    },[ownerId])
    
  return (
     <div className="min-h-screen bg-zinc-50 text-zinc-900">
  <motion.div 
    initial={{y:-50}}
    animate={{y:0}}
    transition={{duration:0.5}}
    className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
  >
    <div className='max-w-6xl mx-auto px-10 h-16 flex items-center justify-between'>
      <div className='cursor-pointer  font-semibold text-lg tracking-tight' onClick={()=>navigate.push("/")}>
        Tynexa <span className='text-zinc-400'>AI</span>
      </div>
      <button className="px-3 cursor-pointer py-1.5 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition" onClick={()=>navigate.push("/embed")}>
        Embed Chatbot
      </button>
    </div>
  </motion.div>

  <div className="flex justify-center px-4 py-10 mt-8">
    <motion.div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

      <div className="mb-4"> 
        <h1 className="text-xl font-semibold">ChatBot Settings</h1>
        <p className="text-zinc-500  text-sm">
          Manage your AI chatbot knowledge and business details!
        </p>
      </div>

      <div className="mb-4">
        <h1 className="text-base font-medium mb-2">Business Details</h1>
        <div className="space-y-1">
          <input type="text" placeholder="Business Name"  className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80" value={businessName} onChange={(e)=>setBusinessName(e.target.value)}/>
          <input type="text" placeholder="Support Email" className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80" value={supportEmail} onChange={(e)=>setSupportEmail(e.target.value)}/>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-base font-medium mb-2">Knowledge Base</h1>
        <p className="text-xs text-zinc-500 mb-3">
          Add FAQs, policies, delivery info, refunds, etc.
        </p>

        <textarea  
          placeholder={`Example:
◾ Refund policy: 7 days return available 
◾ Delivery time: 3-5 working days 
◾ Cash on delivery available 
◾ Support hours`} onChange={(e)=>setKnowledge(e.target.value)} value={knowledge}
          className="w-full h-40 rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
        />
      </div>

    <div className="flex items-center gap-5">
        <motion.button
        whileHover={{scale:1.03}}
        whileTap={{scale:0.97}}
        disabled={loading}
        onClick={handleSettings}
        className="px-7 py-3 rounded-xl bg-black cursor-pointer text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
        >
        {loading?"Saving...":"Save"}
        
        </motion.button>

        {saved && <motion.span
                   initial={{opacity:0, y:6}}
                   animate={{opacity:1, y:0}}
                   className="text-sm font-medium text-emerald-600 ">
                   
          ✅ Settings Saved
        
          </motion.span>}
    </div>
    </motion.div>
  </div>
</div>
  )
}

export default DashboardClient
