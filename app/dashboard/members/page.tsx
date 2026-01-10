"use client";

import { useEffect, useState } from "react";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      const res = await fetch("/api/choir-members");
      const data = await res.json();

      // ✅ Make sure we are using the array, not the object
      setMembers(data.members || []);
      setLoading(false);
    }

    fetchMembers();
  }, []);

  if (loading) return <p className="text-white">Loading members...</p>;
  if (!members.length) return <p className="text-white">No members found.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((m: any) => (
        <div
          key={m._id}
          className="p-5 bg-[#1b263b] rounded-xl shadow-lg border border-white/10"
        >
          <h3 className="text-lg font-bold">{m.name}</h3>
          <p>Part: {m.part}</p>
          <p>Birth Month: {m.birthMonth}</p>
          {m.birthMonth === new Date().getMonth() + 1 && (
            <p className="text-yellow-300 font-semibold">🎉 Happy Birthday!</p>
          )}
        </div>
      ))}
    </div>
  );
}
