"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Shield, Database, Mail } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your admin panel preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Email Notifications</Label>
                <p className="text-sm text-slate-500">Receive emails for new quotes and applications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">WhatsApp Alerts</Label>
                <p className="text-sm text-slate-500">Get WhatsApp notifications for urgent leads</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Daily Summary</Label>
                <p className="text-sm text-slate-500">Receive a daily summary of all activity</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-base font-semibold">Items Per Page</Label>
              <p className="text-sm text-slate-500">Default number of items to display in tables</p>
              <Input type="number" defaultValue="10" className="w-32" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Auto-refresh Data</Label>
                <p className="text-sm text-slate-500">Automatically refresh data every 5 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Session Timeout</Label>
                <p className="text-sm text-slate-500">Automatically log out after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600" />
              Email Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-base font-semibold">Admin Email</Label>
              <p className="text-sm text-slate-500">Primary email for notifications</p>
              <Input type="email" placeholder="admin@example.com" />
            </div>
            <div className="grid gap-2">
              <Label className="text-base font-semibold">Reply-to Email</Label>
              <p className="text-sm text-slate-500">Email address for client replies</p>
              <Input type="email" placeholder="hello@kaziagency.es" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
