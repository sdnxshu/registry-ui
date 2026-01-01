"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Search, MoreHorizontal, Copy, Trash2, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import type { Tag } from "@/data"

type Props = {
    tags: Tag[]
    repositoryName: string
}

const TagTable = ({ tags, repositoryName }: Props) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const filteredTags = tags.filter(
        (tag) =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tag.digest.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const toggleTag = (tagName: string) => {
        setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]))
    }

    const toggleAll = () => {
        setSelectedTags((prev) => (prev.length === filteredTags.length ? [] : filteredTags.map((t) => t.name)))
    }

    return (
        <div className="space-y-4">
            {/* Search and actions */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-secondary border-0"
                    />
                </div>

                {selectedTags.length > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{selectedTags.length} selected</span>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="border border-border">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border">
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedTags.length === filteredTags.length && filteredTags.length > 0}
                                    onCheckedChange={toggleAll}
                                />
                            </TableHead>
                            <TableHead className="font-medium">Tag</TableHead>
                            <TableHead className="font-medium">Digest</TableHead>
                            <TableHead className="font-medium">Size</TableHead>
                            <TableHead className="font-medium">OS / Arch</TableHead>
                            <TableHead className="font-medium">Created</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTags.map((tag) => (
                            <TableRow key={tag.name} className="border-border">
                                <TableCell>
                                    <Checkbox checked={selectedTags.includes(tag.name)} onCheckedChange={() => toggleTag(tag.name)} />
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/repositories/${repositoryName}/tags/${tag.name}`}
                                        className="font-mono text-sm hover:underline"
                                    >
                                        {tag.name}
                                    </Link>
                                    {tag.name === "latest" && (
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                            latest
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <code className="text-xs text-muted-foreground font-mono">{tag.digest}</code>
                                </TableCell>
                                <TableCell className="text-sm">{tag.size}</TableCell>
                                <TableCell className="text-sm">
                                    {tag.os}/{tag.architecture}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">{tag.created}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copy pull command
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/repositories/${repositoryName}/tags/${tag.name}`}>
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    View details
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete tag
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {filteredTags.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-lg font-medium">No tags found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search query</p>
                </div>
            )}
        </div>
    )
}

export { TagTable }