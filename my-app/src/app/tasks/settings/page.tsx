'use client'
import { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun, Globe } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const {user, isLoaded} = useUser();
  const router = useRouter();

  useEffect(() => {
    if(isLoaded && !user) {
        router.push("/sign-in")
    }
}, [user, isLoaded])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Settings</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-white-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Globe className="mr-2 text-white" />
                Language Settings
              </CardTitle>
              <CardDescription>Set your language preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language" className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="region" className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}