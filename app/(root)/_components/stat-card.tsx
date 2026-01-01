import React from 'react'

import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/utils/cn"

type Props = {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
    trend?: {
        value: number
        positive: boolean
    }
}

const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    trend
}: Props) => {
    return (
        <Card className="border-border">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <p className="text-3xl font-semibold tracking-tight">{value}</p>
                        {description && <p className="text-xs text-muted-foreground">{description}</p>}
                        {trend && (
                            <p className={cn("text-xs font-medium", trend.positive ? "text-foreground" : "text-destructive")}>
                                {trend.positive ? "+" : ""}
                                {trend.value}% from last week
                            </p>
                        )}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export { StatCard }