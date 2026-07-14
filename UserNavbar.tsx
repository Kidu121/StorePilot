import { Link, useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  User,
  LogOut,
  Package
} from "lucide-react";


import { useCart } from "../context/CartContext";

import { auth } from "../firebase";

import {
  signOut
} from "firebase/auth";





export default function UserNavbar(){



const navigate = useNavigate();



const { totalItems } = useCart();






const logout = async()=>{


await signOut(auth);


navigate("/login");


};







return(


<nav className="
bg-white
border-b
px-8
py-4
flex
justify-between
items-center
">





<div>


<Link

to="/store"

className="
text-2xl
font-bold
text-blue-600
"

>

StorePilot

</Link>


</div>







<div className="
flex
items-center
gap-6
">





<Link

to="/store"

className="
hover:text-blue-600
"

>

Store

</Link>









<Link

to="/my-orders"

className="
flex
items-center
gap-2
hover:text-blue-600
"

>


<Package size={18}/>

My Orders


</Link>









<Link

to="/cart"

className="
relative
"

>



<ShoppingCart size={24}/>



{

totalItems > 0 &&


<span

className="
absolute
-top-3
-right-3
bg-red-600
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"

>

{totalItems}

</span>


}



</Link>









<Link

to="/profile"

className="
flex
items-center
gap-2
hover:text-blue-600
"

>


<User size={18}/>

Profile


</Link>








<button

onClick={logout}

className="
flex
items-center
gap-2
text-red-600
"

>


<LogOut size={18}/>

Logout


</button>







</div>







</nav>


);


}