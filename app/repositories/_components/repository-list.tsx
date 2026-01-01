"use client"

import React, { useState } from "react"

import { Search, Plus, Grid3X3, List } from "lucide-react"

import { RepositoryCard } from "@/app/repositories/_components/repository-card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { repositories } from "@/data"

const RepositoryList = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [visibilityFilter, setVisibilityFilter] = useState<"all" | "public" | "private">("all")
    const [sortBy, setSortBy] = useState<"name" | "pulls" | "updated">("updated")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    const filteredRepos = repositories
        .filter((repo) => {
            const matchesSearch =
                repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                repo.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesVisibility = visibilityFilter === "all" || repo.visibility === visibilityFilter
            return matchesSearch && matchesVisibility
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name)
                case "pulls":
                    return b.pulls - a.pulls
                case "updated":
                    return 0 // Keep original order for "updated" since we're using strings
                default:
                    return 0
            }
        })

    return (
        <div className="space-y-4">
            {/* Filters row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search repositories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-secondary border-0"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Select
                        value={visibilityFilter}
                        onValueChange={(v) => setVisibilityFilter(v as "all" | "public" | "private")}
                    >
                        <SelectTrigger className="w-32 bg-secondary border-0">
                            <SelectValue placeholder="Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={(v) => setSortBy(v as "name" | "pulls" | "updated")}>
                        <SelectTrigger className="w-32 bg-secondary border-0">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="updated">Last updated</SelectItem>
                            <SelectItem value="pulls">Most pulls</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center border border-border">
                        <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "secondary" : "ghost"}
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">New Repository</span>
                    </Button>
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
                Showing {filteredRepos.length} of {repositories.length} repositories
            </p>

            {/* Repository grid/list */}
            <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
                {filteredRepos.map((repo) => (
                    <RepositoryCard key={repo.name} repository={repo} />
                ))}
            </div>

            {filteredRepos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-lg font-medium">No repositories found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}

export { RepositoryList }