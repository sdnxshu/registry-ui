'use client';

import { useState } from 'react';
import { Search, Package, Tag, Trash2, Download, Copy, RefreshCw } from 'lucide-react';

interface Repository {
    name: string;
    tags?: string[];
}

interface ImageDetails {
    name: string;
    tag: string;
    digest: string;
    size: number;
    created: string;
    layers: number;
}

export default function RegistryUI() {
    // -------------------------
    // MOCK DATA
    // -------------------------
    const mockRepositories: Repository[] = [
        { name: "frontend-app" },
        { name: "backend-service" },
        { name: "database" }
    ];

    const mockTags: Record<string, string[]> = {
        "frontend-app": ["v1.0.1", "v1.0.0", "latest"],
        "backend-service": ["2.1", "2.0", "1.9"],
        "database": ["15.4", "15.3"]
    };

    const mockImageDetails: ImageDetails = {
        name: "frontend-app",
        tag: "latest",
        digest: "sha256:1234567890abcdefghijklmnopqrstuv",
        size: 145000000,
        created: "2025-01-10T12:30:00Z",
        layers: 12
    };

    // -------------------------
    // UI STATE ONLY
    // -------------------------
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRepos = mockRepositories.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Package className="w-8 h-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">Docker Registry UI</h1>
                        </div>

                        {/* Refresh button - now does nothing */}
                        <button
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Repositories List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Repositories</h2>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search repositories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="divide-y max-h-[600px] overflow-y-auto">
                                {filteredRepos.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No repositories found</div>
                                ) : (
                                    filteredRepos.map((repo) => (
                                        <button
                                            key={repo.name}
                                            onClick={() => {
                                                setSelectedRepo(repo.name);
                                                setSelectedTag(null);
                                            }}
                                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition ${selectedRepo === repo.name ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Package className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium text-gray-900">{repo.name}</span>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tags & Details */}
                    <div className="lg:col-span-2">
                        {selectedRepo ? (
                            <div className="bg-white rounded-lg shadow-sm border">
                                <div className="p-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">{selectedRepo}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {mockTags[selectedRepo]?.length || 0} tags available
                                    </p>
                                </div>

                                <div className="divide-y max-h-[600px] overflow-y-auto">
                                    {mockTags[selectedRepo]?.map((tag) => (
                                        <div key={tag} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Tag className="w-5 h-5 text-blue-600" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{tag}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {selectedRepo}:{tag}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        onClick={() => { }}
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                                                        onClick={() => setSelectedTag(tag)}
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        onClick={() => { }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Mock Details */}
                                            {selectedTag === tag && (
                                                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div><span className="font-medium">Digest:</span> {mockImageDetails.digest.substring(0, 20)}...</div>
                                                        <div><span className="font-medium">Size:</span> {(mockImageDetails.size / 1024 / 1024).toFixed(2)} MB</div>
                                                        <div><span className="font-medium">Layers:</span> {mockImageDetails.layers}</div>
                                                        <div><span className="font-medium">Created:</span> {mockImageDetails.created}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Select a Repository
                                </h3>
                                <p className="text-gray-500">
                                    Choose a repository from the list to view its tags
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
