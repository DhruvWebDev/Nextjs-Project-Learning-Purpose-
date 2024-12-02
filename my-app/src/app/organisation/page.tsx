'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { CheckCircle, Building, Users, Briefcase } from 'lucide-react'
import Link from "next/link"
import CreateOrganization from '@/components/create-organisation'
import { useRouter } from 'next/navigation'
export default function Organization() {
    const router = useRouter();
  const [orgName, setOrgName] = useState('')
  const [orgDescription, setOrgDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Organization :', { name: orgName, description: orgDescription });
    CreateOrganization(orgName, orgDescription); // Correct usage
    router.push("/tasks")
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <CheckCircle className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">TaskFlow</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
            Profile
          </Link>
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content with Grid Background */}
      <main className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Create Your Organization</h1>
            
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 p-6 mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="orgName" className="block text-lg font-bold mb-2 text-blue-400">
                    Organization Name
                  </label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter organization name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="orgDescription" className="block text-lg font-bold mb-2 text-blue-400">
                    Description
                  </label>
                  <Textarea
                    id="orgDescription"
                    value={orgDescription}
                    onChange={(e) => setOrgDescription(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Describe your organization"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                  Create Organization
                </Button>
              </form>
            </Card>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">Establish Your Presence</h3>
                <p className="text-gray-400">Create a central hub for your team&apos;s collaboration and project management.</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">Invite Team Members</h3>
                <p className="text-gray-400">Easily add your colleagues and start working together seamlessly.</p>
              </div>
              <div className="text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2">Manage Projects</h3>
                <p className="text-gray-400">Organize and track your team&apos;s work with powerful project management tools.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-6 text-center text-gray-400">
        <p>&copy; 2023 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  )
}