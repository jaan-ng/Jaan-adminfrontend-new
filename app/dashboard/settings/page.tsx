"use client"

import { useState } from "react"
import { Sidebar } from "../components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobeIcon, KeyIcon, ShieldIcon } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
        </div>

        <Tabs defaultValue="account" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          {/* Account Tab Content */}
          <TabsContent value="account">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Sedi Raheem" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="sedi.raheem@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1 (234) 567-8901" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Administrator" disabled />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Language</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <GlobeIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium dark:text-gray-300">English (US)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Time Zone</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Set your local time zone</div>
                      </div>
                      <div className="text-sm font-medium dark:text-gray-300">(UTC-05:00) Eastern Time</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab Content */}
          <TabsContent value="security">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-gray-100">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button className="gap-2">
                    <KeyIcon className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium dark:text-gray-200">Enable 2FA</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Session Management</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Current Session</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Chrome on Windows • 192.168.1.1</div>
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">Active Now</div>
                    </div>

                    <Button variant="outline" className="gap-2">
                      <ShieldIcon className="h-4 w-4" />
                      Sign Out All Other Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab Content */}
          <TabsContent value="notifications">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications and alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-gray-100">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Security Alerts</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified about security events
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Transaction Updates</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Receive transaction status changes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Marketing Emails</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Receive promotional content</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-4 dark:text-gray-100">System Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Browser Notifications</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Show desktop notifications</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Sound Alerts</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Play sound for important notifications
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab Content */}
          <TabsContent value="appearance">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the dashboard looks and feels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-gray-100">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="h-20 w-full bg-white border rounded-md"></div>
                      <div className="font-medium dark:text-gray-200">Light</div>
                    </div>

                    <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="h-20 w-full bg-gray-900 border rounded-md"></div>
                      <div className="font-medium dark:text-gray-200">Dark</div>
                    </div>

                    <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="h-20 w-full bg-gradient-to-r from-white to-gray-900 border rounded-md"></div>
                      <div className="font-medium dark:text-gray-200">System</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Layout</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Compact Mode</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing between elements</div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Sidebar Collapsed</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Start with sidebar collapsed</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab Content */}
          <TabsContent value="api">
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage your API keys and access tokens.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-gray-100">API Keys</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Production API Key</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Last used: 2 hours ago</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input value="••••••••••••••••••••••••" className="w-64" readOnly />
                        <Button variant="outline" size="sm">
                          Show
                        </Button>
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Test API Key</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Last used: 5 days ago</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input value="••••••••••••••••••••••••" className="w-64" readOnly />
                        <Button variant="outline" size="sm">
                          Show
                        </Button>
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Webhook Settings</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="https://your-server.com/webhook" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-gray-200">Enable Webhooks</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Send events to your server</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
