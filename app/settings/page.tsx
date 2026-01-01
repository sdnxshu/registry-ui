"use client"

import React, { useState } from "react"

import {
    Key,
    Copy,
    Trash2,
    Plus,
    User,
    Shield,
    Database,
    Bell,
    Palette,
    Globe
} from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock API keys
const apiKeys = [
    {
        id: "1",
        name: "CI/CD Pipeline",
        key: "rgst_****************************abc1",
        created: "2024-01-10",
        lastUsed: "2 hours ago",
        scopes: ["read", "write"],
    },
    {
        id: "2",
        name: "Deployment Bot",
        key: "rgst_****************************xyz2",
        created: "2024-01-05",
        lastUsed: "1 day ago",
        scopes: ["read"],
    },
    {
        id: "3",
        name: "Monitoring Service",
        key: "rgst_****************************def3",
        created: "2023-12-20",
        lastUsed: "5 minutes ago",
        scopes: ["read"],
    },
]

// Mock users
const users = [
    { id: "1", name: "Admin User", email: "admin@registry.io", role: "admin", status: "active" },
    { id: "2", name: "John Developer", email: "john@registry.io", role: "developer", status: "active" },
    { id: "3", name: "Jane Ops", email: "jane@registry.io", role: "operator", status: "active" },
    { id: "4", name: "Guest User", email: "guest@registry.io", role: "viewer", status: "pending" },
]

const Page = () => {
    const [notifications, setNotifications] = useState({
        pushEvents: true,
        pullEvents: false,
        deleteEvents: true,
        securityAlerts: true,
        weeklyDigest: false,
    })

    const [preferences, setPreferences] = useState({
        defaultVisibility: "private",
        autoScan: true,
        retentionDays: "30",
        compressionLevel: "default",
    })

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your registry configuration and preferences</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-secondary flex-wrap h-auto gap-1 p-1">
                    <TabsTrigger value="general" className="gap-2">
                        <Palette className="h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="access" className="gap-2">
                        <Shield className="h-4 w-4" />
                        Access Control
                    </TabsTrigger>
                    <TabsTrigger value="api-keys" className="gap-2">
                        <Key className="h-4 w-4" />
                        API Keys
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="storage" className="gap-2">
                        <Database className="h-4 w-4" />
                        Storage
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Registry Information</CardTitle>
                            <CardDescription>Basic information about your registry instance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="registry-name">Registry Name</Label>
                                    <Input id="registry-name" defaultValue="My Docker Registry" className="bg-secondary border-0" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="registry-url">Registry URL</Label>
                                    <Input id="registry-url" defaultValue="registry.io" className="bg-secondary border-0" disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    defaultValue="Private Docker image registry for internal use"
                                    className="bg-secondary border-0"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Display Preferences</CardTitle>
                            <CardDescription>Customize how the registry interface appears</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Dark Mode</Label>
                                    <p className="text-xs text-muted-foreground">Enable dark theme for the interface</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Compact View</Label>
                                    <p className="text-xs text-muted-foreground">Show more items per page with smaller spacing</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="space-y-2">
                                <Label>Items per Page</Label>
                                <Select defaultValue="25">
                                    <SelectTrigger className="w-32 bg-secondary border-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </TabsContent>

                {/* Access Control */}
                <TabsContent value="access" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div>
                                <CardTitle className="text-base">Users</CardTitle>
                                <CardDescription>Manage user access to the registry</CardDescription>
                            </div>
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add User
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead className="font-medium">User</TableHead>
                                        <TableHead className="font-medium">Role</TableHead>
                                        <TableHead className="font-medium">Status</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id} className="border-border">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center bg-secondary">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{user.name}</p>
                                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize">
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.status === "active" ? "secondary" : "outline"} className="capitalize">
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Default Repository Settings</CardTitle>
                            <CardDescription>Configure default settings for new repositories</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Default Visibility</Label>
                                <Select
                                    value={preferences.defaultVisibility}
                                    onValueChange={(v) => setPreferences((p) => ({ ...p, defaultVisibility: v }))}
                                >
                                    <SelectTrigger className="w-40 bg-secondary border-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                Public
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="private">
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-4 w-4" />
                                                Private
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Require Pull Authentication</Label>
                                    <p className="text-xs text-muted-foreground">Require authentication for all image pulls</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* API Keys */}
                <TabsContent value="api-keys" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div>
                                <CardTitle className="text-base">API Keys</CardTitle>
                                <CardDescription>Manage API keys for programmatic access</CardDescription>
                            </div>
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Create Key
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead className="font-medium">Name</TableHead>
                                        <TableHead className="font-medium">Key</TableHead>
                                        <TableHead className="font-medium">Scopes</TableHead>
                                        <TableHead className="font-medium">Last Used</TableHead>
                                        <TableHead className="w-24"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {apiKeys.map((apiKey) => (
                                        <TableRow key={apiKey.id} className="border-border">
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm font-medium">{apiKey.name}</p>
                                                    <p className="text-xs text-muted-foreground">Created {apiKey.created}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-xs font-mono text-muted-foreground">{apiKey.key}</code>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                                        <Copy className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    {apiKey.scopes.map((scope) => (
                                                        <Badge key={scope} variant="outline" className="text-xs">
                                                            {scope}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{apiKey.lastUsed}</TableCell>
                                            <TableCell>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="text-destructive h-8">
                                                            Revoke
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Revoke API Key</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to revoke this API key? This action cannot be undone and any
                                                                services using this key will lose access.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                                                Revoke Key
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Event Notifications</CardTitle>
                            <CardDescription>Configure which events trigger notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Push Events</Label>
                                    <p className="text-xs text-muted-foreground">Notify when images are pushed to a repository</p>
                                </div>
                                <Switch
                                    checked={notifications.pushEvents}
                                    onCheckedChange={(v) => setNotifications((n) => ({ ...n, pushEvents: v }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Pull Events</Label>
                                    <p className="text-xs text-muted-foreground">Notify when images are pulled from a repository</p>
                                </div>
                                <Switch
                                    checked={notifications.pullEvents}
                                    onCheckedChange={(v) => setNotifications((n) => ({ ...n, pullEvents: v }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Delete Events</Label>
                                    <p className="text-xs text-muted-foreground">Notify when images or tags are deleted</p>
                                </div>
                                <Switch
                                    checked={notifications.deleteEvents}
                                    onCheckedChange={(v) => setNotifications((n) => ({ ...n, deleteEvents: v }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Security Alerts</Label>
                                    <p className="text-xs text-muted-foreground">Notify when vulnerabilities are detected</p>
                                </div>
                                <Switch
                                    checked={notifications.securityAlerts}
                                    onCheckedChange={(v) => setNotifications((n) => ({ ...n, securityAlerts: v }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Weekly Digest</Label>
                                    <p className="text-xs text-muted-foreground">Receive a weekly summary of registry activity</p>
                                </div>
                                <Switch
                                    checked={notifications.weeklyDigest}
                                    onCheckedChange={(v) => setNotifications((n) => ({ ...n, weeklyDigest: v }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Notification Channels</CardTitle>
                            <CardDescription>Configure where to receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="admin@registry.io"
                                    className="bg-secondary border-0 max-w-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="webhook">Webhook URL</Label>
                                <Input
                                    id="webhook"
                                    placeholder="https://hooks.example.com/webhook"
                                    className="bg-secondary border-0 max-w-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slack">Slack Webhook</Label>
                                <Input
                                    id="slack"
                                    placeholder="https://hooks.slack.com/services/..."
                                    className="bg-secondary border-0 max-w-md"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </TabsContent>

                {/* Storage */}
                <TabsContent value="storage" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Storage Usage</CardTitle>
                            <CardDescription>Monitor your registry storage consumption</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Used</span>
                                    <span className="font-mono">24.8 GB / 100 GB</span>
                                </div>
                                <div className="h-2 bg-secondary overflow-hidden">
                                    <div className="h-full bg-foreground" style={{ width: "24.8%" }} />
                                </div>
                                <p className="text-xs text-muted-foreground">75.2 GB available</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Garbage Collection</CardTitle>
                            <CardDescription>Configure automatic cleanup of unused layers</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Automatic Garbage Collection</Label>
                                    <p className="text-xs text-muted-foreground">Automatically remove unreferenced image layers</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="space-y-2">
                                <Label>Retention Period</Label>
                                <Select
                                    value={preferences.retentionDays}
                                    onValueChange={(v) => setPreferences((p) => ({ ...p, retentionDays: v }))}
                                >
                                    <SelectTrigger className="w-40 bg-secondary border-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="7">7 days</SelectItem>
                                        <SelectItem value="14">14 days</SelectItem>
                                        <SelectItem value="30">30 days</SelectItem>
                                        <SelectItem value="60">60 days</SelectItem>
                                        <SelectItem value="90">90 days</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Unreferenced layers older than this will be automatically deleted
                                </p>
                            </div>
                            <Button variant="outline" className="bg-transparent">
                                Run Garbage Collection Now
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Security Scanning</CardTitle>
                            <CardDescription>Configure vulnerability scanning settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Automatic Scanning</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Automatically scan images for vulnerabilities on push
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.autoScan}
                                    onCheckedChange={(v) => setPreferences((p) => ({ ...p, autoScan: v }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Block Vulnerable Images</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Prevent pulling images with critical vulnerabilities
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Page