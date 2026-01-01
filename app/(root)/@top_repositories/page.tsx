import React from 'react'
import Link from "next/link"

import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { repositories } from "@/data"

const Page = () => {
    const topRepos = [...repositories].sort((a, b) => b.pulls - a.pulls).slice(0, 5)

    return (
        <Card className="border-border">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Top Repositories</CardTitle>
                    <Link
                        href="/repositories"
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                        View all
                        <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="space-y-0">
                {topRepos.map((repo, index) => (
                    <div
                        key={repo.name}
                        className={`flex items-center justify-between py-3 ${index !== 0 ? "border-t border-border" : ""}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground font-mono w-4">{index + 1}</span>
                            <div>
                                <Link href={`/repositories/${repo.name}`} className="text-sm font-medium hover:underline">
                                    {repo.name}
                                </Link>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-muted-foreground">{repo.tags} tags</span>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">{repo.size}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-mono">{repo.pulls.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">pulls</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Page