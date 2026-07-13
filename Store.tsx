import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../components/UserNavbar";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import UserChat from "../components/UserChat";

import {
  collection,
  getDocs,
} from "firebase/firestore";



interface Product {

id:string;

name:string;

description?:string;

category:string;

buyingPrice:number;

sellingPrice:number;

quantity:number;

imageUrl:string;

brand?:string;

sku?:string;

size?:string;

color?:string;

}




const categories=[

{name:"All",icon:"📦"},

{name:"Electronics",icon:"📱"},

{name:"Clothing",icon:"👕"},

{name:"Shoes",icon:"👟"},

{name:"Home",icon:"🏠"},

{name:"Beauty",icon:"💄"},

{name:"Other",icon:"📌"}

];






export default function Store(){


const navigate = useNavigate();


const {addToCart}=useCart();



const [products,setProducts]=useState<Product[]>([]);


const [category,setCategory]=useState("");

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);







const getProducts=async()=>{


try{


const snapshot =
await getDocs(
collection(db,"products")
);



const data=snapshot.docs.map((doc)=>(

{

id:doc.id,

...doc.data()

}

)) as Product[];



setProducts(data);



}

catch(error){

console.log(error);

}

finally{


setLoading(false);


}



};






useEffect(()=>{

getProducts();

},[]);






const filteredProducts = products.filter((product)=>{


const matchCategory =

category===""

||

product.category.toLowerCase()

===

category.toLowerCase();



const matchSearch =

product.name.toLowerCase()

.includes(

search.toLowerCase()

);



return matchCategory && matchSearch;


});
return (

<div className="
min-h-screen
bg-gray-100
">

<UserNavbar />



<div className="
p-6
md:p-8
space-y-8
">





{/* Hero */}

<div className="
bg-gradient-to-r
from-blue-600
to-purple-600
rounded-3xl
p-8
text-white
flex
flex-col
md:flex-row
justify-between
items-center
gap-6
">


<div>


<h1 className="
text-4xl
font-extrabold
">

Welcome To StorePilot 🛒

</h1>


<p className="
mt-3
text-blue-100
text-lg
">

Find your favorite products and shop easily.

</p>


</div>





<div className="
text-7xl
">

🛍️

</div>



</div>









{/* Search */}

<div className="
bg-white
rounded-2xl
p-4
shadow-sm
flex
items-center
gap-3
">


<Search
className="text-gray-400"
/>


<input


value={search}


onChange={(e)=>setSearch(e.target.value)}



placeholder="Search products..."



className="
w-full
outline-none
text-gray-700
"

/>



</div>









{/* Categories */}


<div className="
grid
grid-cols-2
md:grid-cols-4
lg:grid-cols-7
gap-4
">


{

categories.map((item)=>(


<button


key={item.name}



onClick={()=>


setCategory(

item.name==="All"

?

""

:

item.name

)


}



className={`

bg-white

rounded-2xl

p-5

border

transition

hover:shadow-lg

hover:-translate-y-1



${

(category==="" && item.name==="All")

||

category.toLowerCase()===item.name.toLowerCase()

?

"border-blue-600 bg-blue-50"

:

"border-gray-200"

}

`}



>


<div className="
text-4xl
">

{item.icon}

</div>


<p className="
font-semibold
mt-2
">

{item.name}

</p>



</button>


))


}



</div>









{/* Products */}



{

loading ?


<div className="
text-center
py-20
text-xl
">

Loading products...

</div>



:


<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
">





{

filteredProducts.map((product)=>(



<div


key={product.id}



className="
bg-white
rounded-3xl
overflow-hidden
shadow-sm
border
hover:shadow-xl
transition
duration-300
"

>


<div
className="
relative
"
>


<img


src={product.imageUrl}


alt={product.name}



onClick={()=>navigate(`/product/${product.id}`)}



className="
w-full
h-56
object-cover
cursor-pointer
"

/>





<span className="
absolute
top-3
right-3
bg-blue-600
text-white
px-3
py-1
rounded-full
text-sm
">

{product.category}

</span>



</div>









<div className="
p-5
">





<h2

onClick={()=>navigate(`/product/${product.id}`)}



className="
font-bold
text-xl
cursor-pointer
hover:text-blue-600
"

>


{product.name}


</h2>







<p className="
text-gray-500
mt-1
">

{product.brand || "Store Product"}

</p>







<div className="
flex
justify-between
items-center
mt-4
">


<p className="
text-2xl
font-bold
text-blue-600
">

{product.sellingPrice}

ETB

</p>




<p className="
text-sm
text-gray-500
">

Stock:

{product.quantity}

</p>


</div>









<button


disabled={product.quantity===0}



onClick={()=>{


addToCart({


id:product.id,


name:product.name,


category:product.category,


buyingPrice:product.buyingPrice || 0,


sellingPrice:product.sellingPrice,


imageUrl:product.imageUrl,


stock:product.quantity


});


}}



className="

mt-5

w-full

bg-blue-600

disabled:bg-gray-400

text-white

py-3

rounded-xl

flex

justify-center

items-center

gap-2

hover:bg-blue-700

transition

"



>


<ShoppingCart size={18}/>


{

product.quantity===0

?

"Out Of Stock"

:

"Add To Cart"

}


</button>







<button


onClick={()=>navigate(`/product/${product.id}`)}



className="
mt-3
w-full
border
border-blue-600
text-blue-600
py-3
rounded-xl
hover:bg-blue-50
"


>


View Details


</button>






</div>






</div>



))


}



</div>



}








{

filteredProducts.length===0 && !loading &&


<div className="
bg-white
rounded-2xl
p-10
text-center
">


<h2 className="
text-xl
font-bold
">

No Products Found

</h2>


<p className="
text-gray-500
mt-2
">

Try another search or category

</p>



</div>



}



</div>
<UserChat />

</div>

);

}