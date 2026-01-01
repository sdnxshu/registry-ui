import React from 'react'
import Link from "next/link"

import { ArrowUpCircle, ArrowDownCircle, Trash2, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { recentActivity, type Activity } from "@/data"

const actionConfig: Record<Activity["action"], { icon: typeof ArrowUpCircle; label: string }> = {
    push: { icon: ArrowUpCircle, label: "Pushed" },
    pull: { icon: ArrowDownCircle, label: "Pulled" },
    delete: { icon: Trash2, label: "Deleted" },
    create: { icon: PlusCircle, label: "Created" },
}

const Page = () => {
    return (
        <Card className="border-border">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
                {recentActivity.slice(0, 6).map((activity, index) => {
                    const config = actionConfig[activity.action]
                    const Icon = config.icon
                    return (
                        <div
                            key={activity.id}
                            className={`flex items-center gap-4 py-3 ${index !== 0 ? "border-t border-border" : ""}`}
                        >
                            <div className="flex h-8 w-8 items-center justify-center bg-secondary">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">{config.label}</span>
                                    <Link
                                        href={`/repositories/${activity.repository}`}
                                        className="text-sm font-medium hover:underline truncate"
                                    >
                                        {activity.repository}
                                    </Link>
                                    {activity.tag && (
                                        <Badge variant="secondary" className="text-xs font-mono">
                                            {activity.tag}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">by {activity.user}</p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default Page