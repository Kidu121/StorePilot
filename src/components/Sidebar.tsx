import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";


interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
}


const menu: MenuItem[] = [

  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/"
  },

  {
    name: "Products",
    icon: Package,
    path: "/products"
  },

  {
    name: "Orders",
    icon: ClipboardList,
    path: "/orders"
  },

  {
    name: "Sales",
    icon: ShoppingCart,
    path: "/sales"
  },

  {
    name: "Customers",
    icon: Users,
    path: "/customers"
  },

  {
    name: "Reports",
    icon: BarChart3,
    path: "/reports"
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/settings"
  },

];



export default function Sidebar() {


return (

<aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">


{/* Logo */}

<div className="flex items-center gap-3 mb-10">


<div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

S

</div>


<div>

<h1 className="text-xl font-bold text-gray-900">

StorePilot

</h1>


<p className="text-xs text-gray-500">

Smart POS

</p>


</div>


</div>





{/* Menu */}


<nav className="space-y-2">


{

menu.map((item)=>{


const Icon = item.icon;


return (


<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

`

w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all

${

isActive

?

"bg-blue-50 text-blue-600 font-semibold"

:

"text-gray-600 hover:bg-gray-100"

}

`

}


>


<Icon size={20}/>


<span>

{item.name}

</span>



</NavLink>


);


})


}



</nav>





</aside>


);


}