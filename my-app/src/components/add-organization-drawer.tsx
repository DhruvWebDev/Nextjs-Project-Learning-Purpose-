"use client"

import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useFetch from "@/hooks/use-fetch"
// import { createOrganization } from "@/api/apiOrganization"
import { useUser } from "@clerk/nextjs"

export function SidebarOrganizationDrawer({ open, onClose }) {
  const [name, setName] = React.useState("")
  const [icon, setIcon] = React.useState<File | null>(null)
  const [description, setDescription] = React.useState("") // Adding description
  const {user, isLoaded} = useUser();
  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    setIcon(file)
  }

  // const { data, error, loading, fn: fnOrg } = useFetch(createOrganization);

  
  const handleSave = () => {
    // Handle saving the organization option with the icon
    console.log("Saved organization:", { name, icon })

    const payLoad = {
      user_id: user?.id,
      organization: name,
      description: description,
      organizationIcon: icon,
    }

    // fnOrg(payLoad)
  }


  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="text-white">Add Organization</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black text-white shadow-lg bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]">
        <div className="mx-auto w-full max-w-sm bg-black p-4 rounded-lg">
          <DrawerHeader>
            <DrawerTitle>Add Organization</DrawerTitle>
            <DrawerDescription>Add a new organization.</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4 p-4 pb-0 bg-opacity-60">
            {/* Organization Name Input */}
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the organization name"
                className="bg-black text-white border border-zinc-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Organization Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                className="bg-black text-white border border-zinc-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* File Input */}
            <div>
              <Label htmlFor="icon">Upload Icon</Label>
              <Input
                type="file"
                id="icon"
                onChange={handleIconChange}
                accept="image/*"
                className="mt-2 bg-black text-white border border-zinc-600 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="text-sm text-muted-foreground mt-1">
                {icon ? `Selected icon: ${icon.name}` : "No icon selected"}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="text-white">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
