"use client"

import React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    LayoutDashboard,
    Package,
    Settings,
    Box,
    Activity,
    Users,
    HardDrive
} from "lucide-react"

import { cn } from "@/utils/cn"

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Repositories", href: "/repositories", icon: Package },
]

const stats = [
    { name: "Storage", value: "24.8 GB", icon: HardDrive },
    { name: "Active Users", value: "47", icon: Users },
    { name: "Daily Pulls", value: "2,453", icon: Activity },
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center gap-2 border-b border-border px-6">
                    <Box className="h-6 w-6" />
                    <span className="text-lg font-semibold tracking-tight">Registry</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-secondary text-foreground"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="border-t border-border">
                    <Link
                        href="/settings"
                        className={cn(
                            "flex items-center gap-3 px-3 text-sm font-medium transition-colors py-2.5",
                            pathname.startsWith("/settings")
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </div>

                {/* Stats */}
                <div className="border-t border-border p-4">
                    <div className="space-y-3">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <stat.icon className="h-3.5 w-3.5" />
                                    {stat.name}
                                </div>
                                <span className="font-mono text-foreground">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}

export { Sidebar }