import React from 'react'
import Link from "next/link"
import { notFound } from "next/navigation"

import {
    ChevronLeft,
    Copy,
    Trash2,
    HardDrive,
    Calendar,
    Cpu,
    Layers,
    FileText,
    Shield,
    Download
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { repositories, tags } from "@/data"

// Mock layer data
const layerData = [
    { id: "sha256:a1b2c3...", size: "2.8 MB", command: "ADD file:... in /" },
    { id: "sha256:d4e5f6...", size: "1.2 KB", command: 'CMD ["nginx", "-g", "daemon off;"]' },
    { id: "sha256:g7h8i9...", size: "78 MB", command: "RUN /bin/sh -c apt-get update && apt-get install..." },
    { id: "sha256:j0k1l2...", size: "45 MB", command: "COPY ./config /etc/nginx/nginx.conf" },
    { id: "sha256:m3n4o5...", size: "16 MB", command: "RUN /bin/sh -c npm install --production" },
]

// Mock labels/metadata
const labelData = [
    { key: "maintainer", value: "dev@registry.io" },
    { key: "org.opencontainers.image.source", value: "https://github.com/org/repo" },
    { key: "org.opencontainers.image.version", value: "1.25.3" },
    { key: "org.opencontainers.image.vendor", value: "NGINX Inc" },
    { key: "org.opencontainers.image.licenses", value: "BSD-2-Clause" },
    { key: "org.opencontainers.image.description", value: "Official NGINX web server image" },
]

// Mock security scan results
const securityData = {
    critical: 0,
    high: 2,
    medium: 5,
    low: 12,
    lastScan: "2024-01-15 14:32:00 UTC",
}

const Page = async ({
    params,
}: {
    params: Promise<{ name: string; tag: string }>
}) => {
    const { name, tag: tagName } = await params
    const decodedTagName = decodeURIComponent(tagName)

    const repository = repositories.find((r) => r.name === name)
    const repoTags = tags[name] || []
    const tag = repoTags.find((t) => t.name === decodedTagName)

    if (!repository || !tag) {
        notFound()
    }

    const pullCommand = `docker pull registry.io/${name}:${tag.name}`
    const fullDigest = `sha256:abc123def456ghi789jkl012mno345pqr678stu901vwx234yza567bcd890efg`

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/repositories" className="hover:text-foreground">
                    Repositories
                </Link>
                <span>/</span>
                <Link href={`/repositories/${name}`} className="hover:text-foreground">
                    {name}
                </Link>
                <span>/</span>
                <span className="text-foreground">{tag.name}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <Link href={`/repositories/${name}`} className="hover:opacity-70">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-2xl font-semibold tracking-tight font-mono">
                            {name}:{tag.name}
                        </h1>
                        {tag.name === "latest" && <Badge variant="secondary">latest</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">{tag.digest}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Pull
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Pull command */}
            <Card className="border-border">
                <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                        <code className="flex-1 bg-secondary px-4 py-2 text-sm font-mono overflow-x-auto">{pullCommand}</code>
                        <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Info cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <HardDrive className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{tag.size}</p>
                            <p className="text-xs text-muted-foreground">Image size</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{tag.created}</p>
                            <p className="text-xs text-muted-foreground">Created</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <Cpu className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">
                                {tag.os}/{tag.architecture}
                            </p>
                            <p className="text-xs text-muted-foreground">Platform</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-secondary">
                            <Layers className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{tag.layers}</p>
                            <p className="text-xs text-muted-foreground">Layers</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="layers" className="space-y-4">
                <TabsList className="bg-secondary">
                    <TabsTrigger value="layers">Layers</TabsTrigger>
                    <TabsTrigger value="labels">Labels</TabsTrigger>
                    <TabsTrigger value="digest">Digest</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="layers">
                    <Card className="border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Layers className="h-4 w-4" />
                                Image Layers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead className="font-medium w-12">#</TableHead>
                                        <TableHead className="font-medium">Layer ID</TableHead>
                                        <TableHead className="font-medium">Size</TableHead>
                                        <TableHead className="font-medium">Command</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {layerData.map((layer, index) => (
                                        <TableRow key={layer.id} className="border-border">
                                            <TableCell className="font-mono text-muted-foreground">{index + 1}</TableCell>
                                            <TableCell className="font-mono text-xs">{layer.id}</TableCell>
                                            <TableCell className="text-sm">{layer.size}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground max-w-md truncate">
                                                {layer.command}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="labels">
                    <Card className="border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Image Labels
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead className="font-medium">Key</TableHead>
                                        <TableHead className="font-medium">Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {labelData.map((label) => (
                                        <TableRow key={label.key} className="border-border">
                                            <TableCell className="font-mono text-sm">{label.key}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{label.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="digest">
                    <Card className="border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Full Image Digest</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-2">
                                <code className="flex-1 bg-secondary px-4 py-3 text-xs font-mono break-all">{fullDigest}</code>
                                <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p>
                                    <strong>Algorithm:</strong> SHA-256
                                </p>
                                <p>
                                    <strong>Media Type:</strong> application/vnd.docker.distribution.manifest.v2+json
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Security Scan Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-xs text-muted-foreground">Last scanned: {securityData.lastScan}</p>

                            <div className="grid gap-4 sm:grid-cols-4">
                                <div className="bg-destructive/10 p-4 border border-destructive/20">
                                    <p className="text-3xl font-semibold">{securityData.critical}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Critical</p>
                                </div>
                                <div className="bg-secondary p-4">
                                    <p className="text-3xl font-semibold">{securityData.high}</p>
                                    <p className="text-xs text-muted-foreground mt-1">High</p>
                                </div>
                                <div className="bg-secondary p-4">
                                    <p className="text-3xl font-semibold">{securityData.medium}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Medium</p>
                                </div>
                                <div className="bg-secondary p-4">
                                    <p className="text-3xl font-semibold">{securityData.low}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Low</p>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full bg-transparent">
                                View Full Security Report
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Page