import React from 'react'
import Link from "next/link"

import { Tag, Download, HardDrive, Clock, Lock, Globe } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import type { Repository } from "@/data"

type Props = {
    repository: Repository
}

const RepositoryCard = ({ repository }: Props) => {
    return (
        <Link href={`/repositories/${repository.name}`}>
            <Card className="border-border hover:bg-secondary/50 transition-colors cursor-pointer">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-medium truncate">{repository.name}</h3>
                                <Badge variant="outline" className="text-xs shrink-0">
                                    {repository.visibility === "public" ? (
                                        <Globe className="h-3 w-3 mr-1" />
                                    ) : (
                                        <Lock className="h-3 w-3 mr-1" />
                                    )}
                                    {repository.visibility}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 truncate">{repository.description}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5" />
                            <span className="font-mono">{repository.tags}</span>
                            <span>tags</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Download className="h-3.5 w-3.5" />
                            <span className="font-mono">{repository.pulls.toLocaleString()}</span>
                            <span>pulls</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <HardDrive className="h-3.5 w-3.5" />
                            <span>{repository.size}</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{repository.lastUpdated}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export { RepositoryCard }