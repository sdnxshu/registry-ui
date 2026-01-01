import React from 'react'

import { RepositoryList } from "@/app/repositories/_components/repository-list"

const Page = () => {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Repositories</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your Docker image repositories</p>
            </div>

            {/* Repository list */}
            <RepositoryList />
        </div>
    )
}

export default Page