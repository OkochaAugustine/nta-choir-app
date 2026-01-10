"use client";

import {
  X,
  Home,
  Music,
  Headphones,
  Megaphone,
  CalendarDays,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0d1b2a] border-r border-gray-700 text-white z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex lg:flex-col lg:h-screen
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-700">
          <h2 className="text-lg font-semibold tracking-wide">Living Spring Voices</h2>
          <button className="lg:hidden text-white" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-1 px-3 flex-1 overflow-y-auto">
          <SidebarLink href="/dashboard" icon={<Home />} active={pathname === "/dashboard"}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/dashboard/songs" icon={<Music />} active={pathname.startsWith("/dashboard/songs")}>
            Upload Songs
          </SidebarLink>
          <SidebarLink href="/dashboard/gospel-songs" icon={<Headphones />} active={pathname.startsWith("/dashboard/gospel-songs")}>
            Gospel Music Library
          </SidebarLink>
          
          <SidebarLink href="/dashboard/rehearsals" icon={<CalendarDays />} active={pathname.startsWith("/dashboard/rehearsals")}>
            Rehearsals Schedule
          </SidebarLink>
        </nav>
      </aside>
    </>
  );
}

function SidebarLink({
  href,
  icon,
  children,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
        ${active ? "bg-[#3c096c] text-purple-200 shadow-lg" : "hover:bg-gray-700 hover:scale-[1.02]"}
      `}
    >
      <span>{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  );
}
