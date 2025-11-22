"use client"

import { useState, useEffect } from "react"

import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

// Custom hook to manage user authentication state
export function useUser() {
  // user state and setter function
  const [user, setUser] = useState<User | null | undefined>(undefined) 

  useEffect(() => { 
    // check for existing session using supabase auth client
    const checkSession = async () => { 
      const { data: { session } } = await supabase.auth.getSession() 
      setUser(session?.user ?? null)
    }

    checkSession() 
    
    // listen for auth state changes (login, logout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => { 
      // Set user state based on session info
      setUser(session?.user ?? null)
    }) 

    return () => { 
      // cleanup subscription on unmount
      listener.subscription.unsubscribe() 
    }
  }, [])

  // return user state and setter function
  return { user, setUser }
}