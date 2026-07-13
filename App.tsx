import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import ProductDetails from "./pages/ProductDetails";
import Store from "./pages/Store";
import Checkout from "./pages/Checkout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";

import Home from "./pages/Home";


import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import {
  useEffect,
  useState
} from "react";


import {
  onAuthStateChanged
} from "firebase/auth";


import {
  doc,
  getDoc
} from "firebase/firestore";


import {
  auth,
  db
} from "./firebase";






// ADMIN LAYOUT

function AdminLayout(){


return (

<div className="flex min-h-screen bg-gray-100">


<Sidebar />


<div className="flex-1 flex flex-col">


<Navbar />


<main className="flex-1 p-6">


<Routes>


<Route
path="/dashboard"
element={<Dashboard />}
/>


<Route
path="/products"
element={<Products />}
/>


<Route
path="/orders"
element={<Orders />}
/>


<Route
path="/sales"
element={<Sales />}
/>


<Route
path="/customers"
element={<Customers />}
/>


<Route
path="/reports"
element={<Reports />}
/>


<Route
path="/settings"
element={<Settings />}
/>


</Routes>


</main>


</div>


</div>


);


}









export default function App(){



const [user,setUser] =
useState<any>(null);



const [role,setRole] =
useState("");



const [loading,setLoading] =
useState(true);







useEffect(()=>{


const unsubscribe =
onAuthStateChanged(

auth,

async(currentUser)=>{


setUser(currentUser);



if(currentUser){


const userRef =
doc(
db,
"users",
currentUser.uid
);



const userSnap =
await getDoc(userRef);



if(userSnap.exists()){


setRole(
userSnap.data().role
);


}



}



setLoading(false);



}



);



return unsubscribe;



},[]);









if(loading){


return(

<div
className="
h-screen
flex
items-center
justify-center
"
>

Loading...

</div>

);


}










return(


<Routes>





{/* HOME PAGE */}

<Route

path="/"

element={

user ?


(

role === "admin"

?

<Navigate to="/dashboard" />

:

<Navigate to="/store" />

)


:

<Home />


}


/>










{/* LOGIN */}


<Route

path="/login"

element={


user

?


(

role === "admin"

?

<Navigate to="/dashboard" />

:

<Navigate to="/store" />


)


:

<Login />


}


/>









{/* SIGNUP */}


<Route

path="/signup"

element={


user

?


<Navigate to="/store" />

:

<Signup />


}


/>









{/* USER STORE */}


<Route

path="/store"

element={


user && role === "user"

?

<Store />

:

<Navigate to="/login" />


}


/>









{/* PROFILE */}


<Route

path="/profile"

element={


user && role === "user"

?

<Profile />

:

<Navigate to="/login" />


}


/>










{/* MY ORDERS */}


<Route

path="/my-orders"

element={


user && role === "user"

?

<MyOrders />

:

<Navigate to="/login" />


}


/>









{/* PRODUCT DETAILS */}


<Route

path="/product/:id"

element={


user && role === "user"

?

<ProductDetails />

:

<Navigate to="/login" />


}


/>









{/* CART */}


<Route

path="/cart"

element={


user && role === "user"

?

<Cart />

:

<Navigate to="/login" />


}


/>









{/* CHECKOUT */}


<Route

path="/checkout"

element={


user && role === "user"

?

<Checkout />

:

<Navigate to="/login" />


}


/>









{/* ADMIN */}


<Route

path="/*"

element={


user && role === "admin"

?


<AdminLayout />


:


<Navigate to="/" />


}


/>





</Routes>


);



}