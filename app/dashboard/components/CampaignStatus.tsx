interface Campaign {
  id: string
  target: {
    username: string
    avatar: string
  }
  status: "contacting" | "in-conversation" | "closed" | "failed"
  lastInteraction: string
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    target: { username: "@sarah_marketing", avatar: "S" },
    status: "in-conversation",
    lastInteraction: "2 hours ago",
  },
  {
    id: "2",
    target: { username: "@mike_startup", avatar: "M" },
    status: "contacting",
    lastInteraction: "5 hours ago",
  },
  {
    id: "3",
    target: { username: "@jenny_ceo", avatar: "J" },
    status: "closed",
    lastInteraction: "1 day ago",
  },
  {
    id: "4",
    target: { username: "@alex_founder", avatar: "A" },
    status: "failed",
    lastInteraction: "3 days ago",
  },
  {
    id: "5",
    target: { username: "@lisa_growth", avatar: "L" },
    status: "in-conversation",
    lastInteraction: "6 hours ago",
  },
]

const getStatusBadge = (status: Campaign["status"]) => {
  const styles = {
    contacting: "glass-card text-yellow-400 border-yellow-500/30",
    "in-conversation": "glass-card text-blue-400 border-blue-500/30",
    closed: "glass-card text-green-400 border-green-500/30",
    failed: "glass-card text-red-400 border-red-500/30",
  }

  const labels = {
    contacting: "Contacting",
    "in-conversation": "In Conversation",
    closed: "Closed - Group Created",
    failed: "Failed/Rejected",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]} hover:glass-card-hover transition-all duration-200`}
    >
      {labels[status]}
    </span>
  )
}

export function CampaignStatus() {
  return (
    <div className="glass-card-strong rounded-2xl p-8 hover:glass-card-hover transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 glow-text-subtle">Active Campaigns</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 font-semibold text-gray-300">Target</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-300">Last Interaction</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCampaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b border-white/5 hover:glass-card-subtle rounded-lg transition-all duration-300"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 glass-button rounded-full flex items-center justify-center text-white font-semibold glow-box-subtle hover:scale-110 transition-all duration-200">
                      {campaign.target.avatar}
                    </div>
                    <span className="text-gray-200">{campaign.target.username}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{getStatusBadge(campaign.status)}</td>
                <td className="py-4 px-4 text-gray-400">{campaign.lastInteraction}</td>
                <td className="py-4 px-4">
                  <button className="px-3 py-1 glass-card hover:glass-card-hover text-gray-200 text-sm rounded-lg transition-all duration-300 hover:scale-105">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
