import { Sidebar } from "@/components/sidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white flex relative">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div> {/* Close Main Content Area */}
    </div>
  );
}
