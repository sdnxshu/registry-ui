import React from 'react'

import { Package, Tag, Download, HardDrive } from "lucide-react"

import { StatCard } from "@/app/(root)/_components/stat-card"

import { stats } from "@/data"

const Layout = ({
    activity_feed,
    top_repositories,
}: {
    activity_feed: React.ReactNode
    top_repositories: React.ReactNode
}) => {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Overview of your Docker image registry</p>
            </div>

            {/* Stats grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Repositories"
                    value={stats.totalRepositories}
                    icon={Package}
                    trend={{ value: 12, positive: true }}
                />
                <StatCard title="Total Tags" value={stats.totalTags} icon={Tag} trend={{ value: 8, positive: true }} />
                <StatCard
                    title="Total Pulls"
                    value={stats.totalPulls.toLocaleString()}
                    icon={Download}
                    trend={{ value: 23, positive: true }}
                />
                <StatCard title="Storage Used" value={stats.storageUsed} icon={HardDrive} description="of 100 GB allocated" />
            </div>

            {/* Content grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {activity_feed}
                {top_repositories}
            </div>
        </div>
    )
}

export default Layout