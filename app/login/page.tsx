import { LoginForm } from "./components/LoginForm"
import { AuroraBackground } from "../components/AuroraBackground"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative" style={{ backgroundColor: "#111111" }}>
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <AuroraBackground />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card-strong rounded-2xl shadow-xl p-8 hover:glass-card-hover transition-all duration-300">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold mb-2 glow-text-subtle">
              <span className="text-white">Liaiser</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your Liaiser account</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
