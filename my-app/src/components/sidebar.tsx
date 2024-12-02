'use client'; // Add this line to mark the component as client-side

import { cn } from '@/lib/utils'; 
import { LayoutGrid, Calendar, CheckCircle2, Clock, Settings, Plus, Building2 } from 'lucide-react'; 
import { Button } from '@/components/ui/button'; 
import { ScrollArea } from '@/components/ui/scroll-area'; 
import { Separator } from '@/components/ui/separator'; 
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; // Correct import for useRouter

const mainNavItems = [   
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/tasks' },   
  { id: 'today', label: 'Today', icon: Calendar, path: '/tasks/today' },   
  { id: 'upcoming', label: 'Upcoming', icon: Clock, path: '/tasks/upcoming' },   
  { id: 'completed', label: 'Completed', icon: CheckCircle2, path: '/tasks/completed' }, 
];

export function Sidebar() {   
  const router = useRouter();   

  return (     
    <div className="h-screen w-64 bg-zinc-950 text-white border-r border-zinc-800">       
      <div className="p-4">         
        <Button variant="outline" className="w-full justify-start gap-2 bg-zinc-900 border-zinc-800 hover:bg-zinc-800">           
          <Plus size={16} />           
          New Task         
        </Button>       
      </div>              

      <ScrollArea className="h-[calc(100vh-5rem)]">         
        <div className="space-y-4 p-4">           
          <nav className="space-y-2">             
            {mainNavItems.map((item) => (               
              <Link                 
                key={item.id}                 
                href={item.path}                 
                className={cn(                   
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white hover:bg-zinc-900",                   
                  router.pathname === item.path && "bg-zinc-900 text-white"                 
                )}               
              >                 
                <item.icon size={18} />                 
                {item.label}               
              </Link>             
            ))}           
          </nav>            

          <Separator className="bg-zinc-800" />                      

          <div>             
            <div className="flex items-center justify-between px-3 py-2">               
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">                 
                Organizations               
              </h2>               
              <Button variant="ghost" size="icon" className="h-5 w-5 text-zinc-500 hover:text-white">                 
                <Plus size={16} />               
              </Button>             
            </div>             
            <div className="grid grid-cols-2 gap-2 mt-2">               
              <Button variant="ghost" className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-zinc-900">                 
                <Building2 size={24} className="text-blue-500" />                 
                <span className="text-xs">Personal</span>               
              </Button>               
              <Button variant="ghost" className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-zinc-900">                 
                <Building2 size={24} className="text-green-500" />                 
                <span className="text-xs">Work</span>               
              </Button>             
            </div>           
          </div>            

          <Separator className="bg-zinc-800" />                      

          <Link             
            href="/tasks/setting"             
            className={cn(               
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white hover:bg-zinc-900",               
              router.pathname === '/settings' && "bg-zinc-900 text-white"             
            )}           
          >             
            <Settings size={18} />             
            Settings           
          </Link>         
        </div>       
      </ScrollArea>     
    </div>   
  ); 
}
