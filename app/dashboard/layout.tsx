"use client";

import { useState } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardNavbar from "./components/DashboardNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#3c096c] to-[#240046] text-white">

      {/* Sidebar overlay on mobile, static on desktop */}
      <DashboardSidebar 
        isOpen={open} 
        onClose={() => setOpen(false)} 
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden min-h-screen">
        <DashboardNavbar onMenuClick={() => setOpen(!open)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
