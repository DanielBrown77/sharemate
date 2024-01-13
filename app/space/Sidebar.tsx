"use client";
import "./global.css";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Avatar } from "primereact/avatar";

export default function SideBar() {
  let items: MenuItem[] = [
    {
      template: () => {
        return (
          <div className="w-full flex items-center p-2 pl-4">
            <Avatar label="S" className="mr-2" />
            <div>
              <span className="font-bold">Space-Name</span>
            </div>
          </div>
        );
      },
    },
    { label: "Messages", icon: "pi pi-inbox" },
    { label: "Settings", icon: "pi pi-cog" },
  ];
  return <Menu id="sidebar" className="flex-none w-52" model={items} />;
}
