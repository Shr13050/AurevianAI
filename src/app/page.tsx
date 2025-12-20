"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"

const Page = () => {
  const [value, setValue] = useState("")
  const trpc = useTRPC()
  
  // 1. Create the mutation for the 'invoke' endpoint
  const invoke = useMutation(trpc.invoke.mutationOptions())

  const handleSubmit = () => {
    if (!value.trim()) return;
    
    console.log("Triggering writer agent with:", value)
    
    // 2. Call the mutation with the user input
    invoke.mutate({ text: value })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">AI Writer Agent</h1>
        
        <div className="space-y-4">
          <Input 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            placeholder="What should the AI write about?"
            className="w-full"
          />
          
          <Button 
            onClick={handleSubmit}
            disabled={invoke.isPending || !value.trim()}
            className="w-full"
          >
            {invoke.isPending ? "Sending to Agent..." : "Submit to Writer"}
          </Button>
        </div>

        {/* 3. Show status feedback to the user */}
        <div className="text-center text-sm">
          {invoke.isSuccess && (
            <div className="text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 animate-pulse">
              ✅ Agent triggered! Check your terminal and Inngest dashboard.
            </div>
          )}
          
          {invoke.isError && (
            <div className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              ❌ Error: {invoke.error.message}
            </div>
          )}
          
          {!invoke.isSuccess && !invoke.isError && !invoke.isPending && (
            <p className="text-gray-500 italic">Press submit to start the AI workflow</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page