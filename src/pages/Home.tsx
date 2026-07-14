import { useNavigate } from "react-router-dom";


export default function Home(){


const navigate = useNavigate();



return (

<div className="min-h-screen bg-gray-50">



{/* Navbar */}

<nav className="
bg-white
shadow-sm
px-8
py-5
flex
justify-between
items-center
">


<h1 className="
text-2xl
font-bold
text-blue-600
">
 STOREPILOT BY KIDUS

</h1>



<div className="
flex
gap-4
">


<button

onClick={()=>navigate("/login")}

className="
px-5
py-2
rounded-xl
text-blue-600
border
border-blue-600
"

>

Login

</button>




<button

onClick={()=>navigate("/signup")}

className="
px-5
py-2
rounded-xl
bg-blue-600
text-white
"

>

Create Account

</button>


</div>


</nav>








{/* Hero */}


<section className="
px-8
py-20
grid
grid-cols-1
md:grid-cols-2
gap-10
items-center
">



<div>


<h1 className="
text-5xl
font-bold
text-gray-900
leading-tight
">

Smart Shopping
With StorePilot

</h1>




<p className="
mt-6
text-gray-500
text-lg
">

Discover quality products,
easy ordering and fast checkout
experience.

</p>




<button

onClick={()=>navigate("/signup")}

className="
mt-8
bg-blue-600
text-white
px-8
py-4
rounded-xl
"

>

Start Shopping

</button>


</div>







<div className="
bg-blue-100
rounded-3xl
h-80
flex
items-center
justify-center
text-8xl
">

🛒

</div>




</section>










{/* Features */}



<section className="
px-8
py-10
">


<h2 className="
text-3xl
font-bold
text-center
mb-8
">

Why Choose StorePilot?

</h2>




<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">



<div className="
bg-white
p-6
rounded-2xl
shadow-sm
">

<h3 className="font-bold text-xl">

Easy Shopping

</h3>

<p className="text-gray-500 mt-2">

Find and order products easily.

</p>

</div>





<div className="
bg-white
p-6
rounded-2xl
shadow-sm
">

<h3 className="font-bold text-xl">

Fast Checkout

</h3>

<p className="text-gray-500 mt-2">

Simple and secure payment.

</p>

</div>






<div className="
bg-white
p-6
rounded-2xl
shadow-sm
">

<h3 className="font-bold text-xl">

Quality Products

</h3>

<p className="text-gray-500 mt-2">

Trusted products from our store.

</p>

</div>



</div>


</section>









{/* Footer */}


<footer className="
bg-gray-900
text-white
text-center
py-6
mt-10
">


<p>

© 2026 StorePilot. All rights reserved. 
           Kidusyared Liku

</p>


</footer>





</div>


);


}