"use client"
import { AIContextBuilder } from "./components/AIContextBuilder"
import { CampaignStatus } from "./components/CampaignStatus"
import { DashboardHeader } from "./components/DashboardHeader"
import { AuroraBackground } from "../components/AuroraBackground"
import DashboardClientProvider from "./DashboardClientProvider"

export default function DashboardPage() {
  return (
    <DashboardClientProvider>
      <div className="min-h-screen relative" style={{ backgroundColor: "#111111" }}>
        {/* Aurora Background */}
        <div className="fixed inset-0 z-0">
          <AuroraBackground />
        </div>

        <div className="relative z-10">
          <DashboardHeader />

          <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            <AIContextBuilder />
            <CampaignStatus />
          </main>
        </div>
      </div>
    </DashboardClientProvider>
  )
}
