// Mock data for Docker Registry Management Application

export interface Repository {
    name: string
    description: string
    tags: number
    pulls: number
    size: string
    lastUpdated: string
    visibility: "public" | "private"
}

export interface Tag {
    name: string
    digest: string
    size: string
    created: string
    os: string
    architecture: string
    layers: number
}

export interface Activity {
    id: string
    action: "push" | "pull" | "delete" | "create"
    repository: string
    tag?: string
    user: string
    timestamp: string
}

export const repositories: Repository[] = [
    {
        name: "nginx",
        description: "Official NGINX web server image",
        tags: 24,
        pulls: 125430,
        size: "142 MB",
        lastUpdated: "2 hours ago",
        visibility: "public",
    },
    {
        name: "postgres",
        description: "PostgreSQL database server",
        tags: 18,
        pulls: 89234,
        size: "387 MB",
        lastUpdated: "5 hours ago",
        visibility: "public",
    },
    {
        name: "redis",
        description: "Redis in-memory data store",
        tags: 12,
        pulls: 67890,
        size: "113 MB",
        lastUpdated: "1 day ago",
        visibility: "public",
    },
    {
        name: "node",
        description: "Node.js runtime environment",
        tags: 45,
        pulls: 234567,
        size: "998 MB",
        lastUpdated: "3 hours ago",
        visibility: "public",
    },
    {
        name: "python",
        description: "Python programming language",
        tags: 38,
        pulls: 198765,
        size: "912 MB",
        lastUpdated: "6 hours ago",
        visibility: "public",
    },
    {
        name: "api-gateway",
        description: "Internal API gateway service",
        tags: 8,
        pulls: 4532,
        size: "256 MB",
        lastUpdated: "12 hours ago",
        visibility: "private",
    },
    {
        name: "auth-service",
        description: "Authentication microservice",
        tags: 15,
        pulls: 8976,
        size: "189 MB",
        lastUpdated: "1 day ago",
        visibility: "private",
    },
    {
        name: "frontend-app",
        description: "React frontend application",
        tags: 22,
        pulls: 12345,
        size: "324 MB",
        lastUpdated: "4 hours ago",
        visibility: "private",
    },
]

export const tags: Record<string, Tag[]> = {
    nginx: [
        {
            name: "latest",
            digest: "sha256:abc123...",
            size: "142 MB",
            created: "2024-01-15",
            os: "linux",
            architecture: "amd64",
            layers: 5,
        },
        {
            name: "1.25.3",
            digest: "sha256:def456...",
            size: "142 MB",
            created: "2024-01-10",
            os: "linux",
            architecture: "amd64",
            layers: 5,
        },
        {
            name: "1.25.2",
            digest: "sha256:ghi789...",
            size: "140 MB",
            created: "2024-01-05",
            os: "linux",
            architecture: "amd64",
            layers: 5,
        },
        {
            name: "alpine",
            digest: "sha256:jkl012...",
            size: "23 MB",
            created: "2024-01-14",
            os: "linux",
            architecture: "amd64",
            layers: 3,
        },
        {
            name: "1.24-alpine",
            digest: "sha256:mno345...",
            size: "22 MB",
            created: "2024-01-08",
            os: "linux",
            architecture: "amd64",
            layers: 3,
        },
    ],
    postgres: [
        {
            name: "latest",
            digest: "sha256:pqr678...",
            size: "387 MB",
            created: "2024-01-14",
            os: "linux",
            architecture: "amd64",
            layers: 12,
        },
        {
            name: "16.1",
            digest: "sha256:stu901...",
            size: "387 MB",
            created: "2024-01-12",
            os: "linux",
            architecture: "amd64",
            layers: 12,
        },
        {
            name: "15.5",
            digest: "sha256:vwx234...",
            size: "379 MB",
            created: "2024-01-08",
            os: "linux",
            architecture: "amd64",
            layers: 12,
        },
        {
            name: "16-alpine",
            digest: "sha256:yza567...",
            size: "236 MB",
            created: "2024-01-13",
            os: "linux",
            architecture: "amd64",
            layers: 8,
        },
    ],
    redis: [
        {
            name: "latest",
            digest: "sha256:bcd890...",
            size: "113 MB",
            created: "2024-01-13",
            os: "linux",
            architecture: "amd64",
            layers: 6,
        },
        {
            name: "7.2.4",
            digest: "sha256:efg123...",
            size: "113 MB",
            created: "2024-01-10",
            os: "linux",
            architecture: "amd64",
            layers: 6,
        },
        {
            name: "alpine",
            digest: "sha256:hij456...",
            size: "32 MB",
            created: "2024-01-12",
            os: "linux",
            architecture: "amd64",
            layers: 4,
        },
    ],
    node: [
        {
            name: "latest",
            digest: "sha256:klm789...",
            size: "998 MB",
            created: "2024-01-15",
            os: "linux",
            architecture: "amd64",
            layers: 9,
        },
        {
            name: "20-alpine",
            digest: "sha256:nop012...",
            size: "178 MB",
            created: "2024-01-14",
            os: "linux",
            architecture: "amd64",
            layers: 5,
        },
        {
            name: "18-slim",
            digest: "sha256:qrs345...",
            size: "245 MB",
            created: "2024-01-12",
            os: "linux",
            architecture: "amd64",
            layers: 6,
        },
    ],
    python: [
        {
            name: "latest",
            digest: "sha256:tuv678...",
            size: "912 MB",
            created: "2024-01-14",
            os: "linux",
            architecture: "amd64",
            layers: 8,
        },
        {
            name: "3.12-slim",
            digest: "sha256:wxy901...",
            size: "156 MB",
            created: "2024-01-13",
            os: "linux",
            architecture: "amd64",
            layers: 5,
        },
        {
            name: "3.11-alpine",
            digest: "sha256:zab234...",
            size: "89 MB",
            created: "2024-01-11",
            os: "linux",
            architecture: "amd64",
            layers: 4,
        },
    ],
    "api-gateway": [
        {
            name: "v2.1.0",
            digest: "sha256:cde567...",
            size: "256 MB",
            created: "2024-01-14",
            os: "linux",
            architecture: "amd64",
            layers: 7,
        },
        {
            name: "v2.0.5",
            digest: "sha256:fgh890...",
            size: "254 MB",
            created: "2024-01-08",
            os: "linux",
            architecture: "amd64",
            layers: 7,
        },
    ],
    "auth-service": [
        {
            name: "v1.5.0",
            digest: "sha256:ijk123...",
            size: "189 MB",
            created: "2024-01-13",
            os: "linux",
            architecture: "amd64",
            layers: 6,
        },
        {
            name: "v1.4.2",
            digest: "sha256:lmn456...",
            size: "187 MB",
            created: "2024-01-06",
            os: "linux",
            architecture: "amd64",
            layers: 6,
        },
    ],
    "frontend-app": [
        {
            name: "latest",
            digest: "sha256:opq789...",
            size: "324 MB",
            created: "2024-01-15",
            os: "linux",
            architecture: "amd64",
            layers: 8,
        },
        {
            name: "v3.2.1",
            digest: "sha256:rst012...",
            size: "324 MB",
            created: "2024-01-12",
            os: "linux",
            architecture: "amd64",
            layers: 8,
        },
    ],
}

export const recentActivity: Activity[] = [
    { id: "1", action: "push", repository: "frontend-app", tag: "latest", user: "ci-bot", timestamp: "2 minutes ago" },
    { id: "2", action: "pull", repository: "nginx", tag: "alpine", user: "deployer", timestamp: "15 minutes ago" },
    { id: "3", action: "push", repository: "api-gateway", tag: "v2.1.0", user: "dev-team", timestamp: "1 hour ago" },
    { id: "4", action: "delete", repository: "python", tag: "3.10-deprecated", user: "admin", timestamp: "2 hours ago" },
    { id: "5", action: "pull", repository: "postgres", tag: "16.1", user: "staging-env", timestamp: "3 hours ago" },
    { id: "6", action: "create", repository: "auth-service", user: "security-team", timestamp: "5 hours ago" },
    { id: "7", action: "push", repository: "node", tag: "20-alpine", user: "ci-bot", timestamp: "6 hours ago" },
    { id: "8", action: "pull", repository: "redis", tag: "latest", user: "cache-service", timestamp: "8 hours ago" },
]

export const stats = {
    totalRepositories: 8,
    totalTags: 182,
    totalPulls: 741739,
    storageUsed: "24.8 GB",
    activeUsers: 47,
    dailyPulls: 2453,
}
