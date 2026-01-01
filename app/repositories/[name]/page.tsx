import React from 'react'
import Link from "next/link"
import { notFound } from "next/navigation"

import {
    ChevronLeft,
    Tag,
    Download,
    HardDrive,
    Clock,
    Globe,
    Lock,
    Copy,
    Settings,
    Trash2,
    ArrowUpCircle,
} from "lucide-react"

import { TagTable } from "@/app/repositories/_components/tag-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { repositories, tags } from "@/data"

const Page = async ({
    params,
}: {
    params: Promise<{ name: string }>
}) => {
    const { name } = await params
    const repository = repositories.find((r) => r.name === name)

    if (!repository) {
        notFound()
    }

    const repoTags = tags[name] || []
    const pullCommand = `docker pull registry.io/${name}:latest`

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/repositories" className="hover:text-foreground flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Repositories
                </Link>
                <span>/</span>
                <span className="text-foreground">{repository.name}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold tracking-tight">{repository.name}</h1>
                        <Badge variant="outline">
                            {repository.visibility === "public" ? (
                                <Globe className="h-3 w-3 mr-1" />
                            ) : (
                                <Lock className="h-3 w-3 mr-1" />
                            )}
                            {repository.visibility}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{repository.description}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <Tag className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{repository.tags}</p>
                            <p className="text-xs text-muted-foreground">Tags</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <Download className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{repository.pulls.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Total pulls</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <HardDrive className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{repository.size}</p>
                            <p className="text-xs text-muted-foreground">Storage used</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{repository.lastUpdated}</p>
                            <p className="text-xs text-muted-foreground">Last updated</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Pull command */}
            <Card className="border-border">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <ArrowUpCircle className="h-4 w-4" />
                        Pull Command
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 bg-secondary px-4 py-2 text-sm font-mono">{pullCommand}</code>
                        <Button variant="outline" size="icon">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tags section */}
            <Tabs defaultValue="tags" className="space-y-4">
                <TabsList className="bg-secondary">
                    <TabsTrigger value="tags">Tags ({repoTags.length})</TabsTrigger>
                    <TabsTrigger value="readme">README</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="tags" className="space-y-4">
                    <TagTable tags={repoTags} repositoryName={repository.name} />
                </TabsContent>

                <TabsContent value="readme">
                    <Card className="border-border">
                        <CardContent className="p-6">
                            <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                                <h2>About {repository.name}</h2>
                                <p>{repository.description}</p>
                                <h3>Quick Start</h3>
                                <pre>
                                    <code>{pullCommand}</code>
                                </pre>
                                <h3>Documentation</h3>
                                <p>
                                    For more information about this image, please refer to the official documentation or contact the
                                    maintainers.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity">
                    <Card className="border-border">
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">Activity log will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Page