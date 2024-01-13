import SideBar from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="space-layout" className="flex w-screen h-screen">
      <SideBar />
      {children}
    </div>
  );
}
