import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  Star
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaXTwitter
} from "react-icons/fa6";


export default function Home(){

const navigate = useNavigate();


const products = [
{
name:"Smart Watch",
price:"",
image:"⌚"
},
{
name:"Premium Headphones",
price:"",
image:"🎧"
},
{
name:"Laptop Pro",
price:"",
image:"💻"
}
];


const features = [
{
icon:<ShoppingCart size={30}/>,
title:"Easy Shopping",
text:"Find and order products easily."
},
{
icon:<ShieldCheck size={30}/>,
title:"Secure Payment",
text:"Safe and trusted checkout."
},
{
icon:<Truck size={30}/>,
title:"Fast Delivery",
text:"Quick delivery service."
}
];


return (

<div className="
min-h-screen
bg-gray-50
">



{/* Navbar */}

<nav className="
fixed
top-0
w-full
z-50
px-8
py-5
flex
justify-between
items-center
bg-white/70
backdrop-blur-xl
shadow-sm
">


<h1 className="
text-2xl
font-bold
bg-gradient-to-r
from-blue-600
to-purple-600
bg-clip-text
text-transparent
">

STOREPILOT BY KIDUS 🇪🇹

</h1>



<div className="flex gap-3">


<button

onClick={()=>navigate("/login")}

className="
px-5
py-2
rounded-full
border
border-blue-600
text-blue-600
hover:bg-blue-50
transition
">

Login

</button>



<button

onClick={()=>navigate("/signup")}

className="
px-6
py-2
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
hover:scale-105
transition
">

Create Account

</button>


</div>


</nav>






{/* Hero Section */}


<section className="
pt-32
px-8
min-h-screen
grid
md:grid-cols-2
gap-10
items-center
bg-gradient-to-br
from-blue-100
via-white
to-purple-100
">



<motion.div

initial={{
opacity:0,
x:-50
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.8
}}

>


<h1 className="
text-5xl
md:text-7xl
font-bold
leading-tight
">


Smart Shopping

<br/>


<span className="
bg-gradient-to-r
from-blue-600
to-purple-600
bg-clip-text
text-transparent
">

With StorePilot

</span>


</h1>



<p className="
mt-6
text-lg
text-gray-600
">

Discover quality products,
easy ordering and fast checkout
experience.

</p>



<button

onClick={()=>navigate("/signup")}

className="
mt-8
px-8
py-4
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
font-bold
hover:scale-105
transition
">

Start Shopping

</button>


</motion.div>





<motion.div

animate={{
y:[0,-20,0]
}}

transition={{
duration:3,
repeat:Infinity
}}

className="
h-96
rounded-3xl
bg-white/60
backdrop-blur-xl
shadow-2xl
flex
items-center
justify-center
text-9xl
">

🛒

</motion.div>



</section>
{/* Free Shipping Banner */}

<section className="
px-8
py-10
">


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

className="
max-w-6xl
mx-auto
rounded-3xl
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
p-8
flex
items-center
justify-center
gap-5
shadow-xl
"
>


<Truck size={35}/>


<h2 className="
text-xl
md:text-2xl
font-bold
">

Free Shipping On All Orders 🚚

</h2>


</motion.div>


</section>






{/* Features Section */}


<section className="
px-8
py-16
">


<h2 className="
text-4xl
font-bold
text-center
mb-12
">

Why Choose StorePilot?

</h2>




<div className="
max-w-6xl
mx-auto
grid
md:grid-cols-3
gap-8
">


{
features.map((feature,index)=>(


<motion.div

key={index}

whileHover={{
scale:1.05,
y:-10
}}

className="
bg-white/70
backdrop-blur-xl
rounded-3xl
p-8
shadow-xl
text-center
"
>


<div className="
w-16
h-16
mx-auto
mb-5
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
">


{feature.icon}


</div>




<h3 className="
text-xl
font-bold
">

{feature.title}

</h3>



<p className="
text-gray-500
mt-3
">

{feature.text}

</p>


</motion.div>


))


}


</div>


</section>









{/* Featured Products */}



<section className="
px-8
py-16
bg-white
">


<h2 className="
text-4xl
font-bold
text-center
mb-12
">

Featured Products

</h2>




<div className="
max-w-6xl
mx-auto
grid
md:grid-cols-3
gap-8
">


{

products.map((product,index)=>(


<motion.div


key={index}


whileHover={{
y:-10
}}


className="
bg-gray-50
rounded-3xl
p-8
shadow-lg
hover:shadow-2xl
transition
text-center
"

>



<div className="
text-7xl
">

{product.image}

</div>




<h3 className="
text-2xl
font-bold
mt-5
">

{product.name}

</h3>



<p className="
mt-3
text-blue-600
font-bold
text-xl
">

{product.price}

</p>




<button

className="
mt-5
w-full
py-3
rounded-xl
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
font-bold
hover:scale-105
transition
"

>

Add To Cart

</button>



</motion.div>


))


}


</div>


</section>









{/* Statistics */}



<section className="
px-8
py-16
">


<div className="
max-w-6xl
mx-auto
grid
grid-cols-2
md:grid-cols-4
gap-6
">


{

[
{
number:"10K+",
text:"Customers"
},
{
number:"5K+",
text:"Products"
},
{
number:"99%",
text:"Satisfaction"
},
{
number:"24/7",
text:"Support"
}

].map((stat,index)=>(


<motion.div

key={index}

whileHover={{
scale:1.05
}}

className="
bg-white
rounded-3xl
shadow-lg
p-8
text-center
"
>


<h3 className="
text-4xl
font-bold
bg-gradient-to-r
from-blue-600
to-purple-600
bg-clip-text
text-transparent
">

{stat.number}

</h3>


<p className="
text-gray-500
mt-3
">

{stat.text}

</p>



</motion.div>


))


}


</div>


</section>







{/* Customer Reviews */}


<section className="
px-8
py-16
bg-gray-100
">


<h2 className="
text-4xl
font-bold
text-center
mb-12
">

Customer Reviews

</h2>



<div className="
max-w-6xl
mx-auto
grid
md:grid-cols-3
gap-8
">


{

[
{
name:"",
review:"Amazing shopping experience."
},
{
name:"",
review:"Fast delivery and quality products."
},
{
name:"",
review:"StorePilot is very easy to use."
}

].map((review,index)=>(


<motion.div

key={index}

whileHover={{
y:-10
}}

className="
bg-white
rounded-3xl
p-8
shadow-lg
"

>


<div className="
flex
text-yellow-400
gap-1
">

{
[1,2,3,4,5].map((star)=>(

<Star

key={star}

fill="currentColor"

/>

))

}

</div>



<p className="
mt-5
text-gray-600
">

"{review.review}"

</p>




<h3 className="
mt-5
font-bold
">

- {review.name}

</h3>


</motion.div>


))


}


</div>


</section>
{/* Newsletter Section */}

<section className="
px-8
py-20
">


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

className="
max-w-5xl
mx-auto
rounded-3xl
p-10
text-center
text-white
bg-gradient-to-r
from-blue-600
to-purple-600
shadow-2xl
"

>


<h2 className="
text-4xl
font-bold
">

Join StorePilot Newsletter

</h2>



<p className="
mt-4
text-blue-100
">

Get new products, offers and updates directly.

</p>




<div className="
mt-8
flex
flex-col
md:flex-row
justify-center
gap-4
">


<input

type="email"

placeholder="Enter your email"

className="
px-6
py-4
rounded-full
text-gray-900
outline-none
md:w-96
"

/>



<button

className="
px-8
py-4
rounded-full
bg-white
text-blue-600
font-bold
hover:scale-105
transition
"

>

Subscribe

</button>


</div>


</motion.div>


</section>









{/* Footer */}


<footer className="
bg-gray-900
text-white
px-8
py-12
">


<div className="
max-w-7xl
mx-auto
grid
md:grid-cols-4
gap-10
">


<div>


<h2 className="
text-3xl
font-bold
bg-gradient-to-r
from-blue-400
to-purple-400
bg-clip-text
text-transparent
">

STOREPILOT

</h2>


<p className="
mt-4
text-gray-400
">

Modern online shopping platform
built by Kidusyared Liku.

</p>


</div>







<div>

<h3 className="
text-xl
font-bold
mb-4
">

Company

</h3>


<p className="
text-gray-400
mb-2
">

About Us

</p>


<p className="
text-gray-400
mb-2
">

Contact

</p>


<p className="
text-gray-400
">

Careers

</p>


</div>







<div>

<h3 className="
text-xl
font-bold
mb-4
">

Support

</h3>


<p className="
text-gray-400
mb-2
">

Help Center

</p>


<p className="
text-gray-400
mb-2
">

Privacy Policy

</p>


<p className="
text-gray-400
">

Terms

</p>


</div>








<div>

<h3 className="
text-xl
font-bold
mb-4
">

Follow Us

</h3>



<div className="
flex
gap-5
">


<a className="
hover:text-blue-400
transition
">

<FaFacebook size={28}/>

</a>



<a className="
hover:text-pink-400
transition
">

<FaInstagram size={28}/>

</a>



<a className="
hover:text-gray-300
transition
">

<FaXTwitter size={28}/>

</a>



</div>


</div>


</div>






<div className="
border-t
border-gray-700
mt-10
pt-6
text-center
text-gray-400
">


© 2026 StorePilot By Kidusyared Liku.
All Rights Reserved.


</div>



</footer>



</div>

);

}