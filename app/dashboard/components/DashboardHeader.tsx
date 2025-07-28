"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function DashboardHeader() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUserEmail(data?.user?.email || "")
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card-strong rounded-2xl px-6 py-4 hover:glass-card-hover transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold glow-text-subtle">
              <span className="text-white">Liaiser</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                Welcome back, {userEmail ? userEmail.split("@")[0].split(".")[0] : "User"}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm glass-card px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:glass-card-hover transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
