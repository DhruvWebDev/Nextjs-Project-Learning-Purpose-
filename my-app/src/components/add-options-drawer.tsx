'use client';

import * as React from 'react';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useFetch from '@/hooks/use-fetch';
// import { addOptions } from '@/api/apiSidebar';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function SidebarOptionsDrawer({ open, close }) {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [file, setFile] = React.useState(null);
  const {user, isLoaded}= useUser();
  // const {data, error, loading, fn:fnOption} = useFetch(addOptions);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    console.log('Saved option:', { name, file });
    const payLoad = {
      user_id: user?.id,
      optionIcon:file,
      options: name,
    }
    // fnOption(payLoad)
    console.log(data);
    router.push(`/tasks/option/options/${name}`)
    // Additional logic to handle the uploaded file can be added here
  };

  return (
    <Drawer open={open} onClose={close}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Sidebar Option</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black text-white shadow-lg bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Sidebar Option</DrawerTitle>
            <div className="text-sm text-muted-foreground">Name the option and upload an icon file.</div>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <Label htmlFor="name">Option Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the name of the option"
                />
              </div>

              {/* File Input */}
              <div>
                <Label htmlFor="file">Upload Icon</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {file && (
                  <div className="text-sm text-muted-foreground mt-2">
                    Selected File: {file.name}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleSave}>Save</Button>
            <DrawerClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
