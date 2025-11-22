"use client"

import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" })
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <button
        onClick={handleGithubLogin}
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </main>
  )
}
