"use client";

import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const { user, setUser } = useUser();

  // logout function
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null) // clear user state
  }

  useEffect(() => {
    if (user === null) {
      router.push("/login")
    }
  }, [user, router])


  const [message, setMessage] = useState("");

  async function fetchMessage() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/test`);
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  if (user === undefined) {
    return <p>Loading...</p>
  }

  return (
    <div className="p-10">
      <Button onClick={handleLogout}>Logout</Button>
      <h1 className="text-3xl font-bold mb-4">Frontend → Backend Test</h1>
      <Button onClick={fetchMessage}>Fetch Message</Button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
