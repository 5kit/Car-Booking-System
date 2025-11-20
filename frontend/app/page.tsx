"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [message, setMessage] = useState("");

  async function fetchMessage() {
    try {
      const res = await fetch("http://localhost:8000/api/test");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Frontend → Backend Test</h1>
      <Button onClick={fetchMessage}>Fetch Message</Button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
