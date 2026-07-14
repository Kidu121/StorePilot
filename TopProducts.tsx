import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";



interface TopProduct{

name:string;

quantity:number;

sales:number;

}




export default function TopProducts(){



const [products,setProducts]=useState<TopProduct[]>([]);






useEffect(()=>{



const getTopProducts = async()=>{


const snapshot = await getDocs(

collection(db,"orders")

);




const productMap:any={};





snapshot.forEach((doc)=>{


const data:any = doc.data();




data.products?.forEach((item:any)=>{



if(productMap[item.name]){



productMap[item.name].quantity += item.quantity;



productMap[item.name].sales +=

item.quantity * item.sellingPrice;



}

else{



productMap[item.name]={


name:item.name,

quantity:item.quantity,

sales:item.quantity * item.sellingPrice



};



}



});



});







const result = Object.values(productMap)

.sort(

(a:any,b:any)=>

b.quantity - a.quantity

)

.slice(0,5);



setProducts(
result as TopProduct[]
);



};




getTopProducts();



},[]);









return(



<div className="
bg-white
rounded-2xl
border
p-6
">





<h2 className="
text-xl
font-semibold
mb-5
">

Top Products

</h2>







{

products.length===0 ?


<p className="text-gray-500">

No sales data

</p>



:



<div className="space-y-4">


{

products.map((product,index)=>(


<div

key={index}

className="
flex
justify-between
items-center
border-b
pb-3
"

>



<div>


<p className="font-bold">

{product.name}

</p>


<p className="text-sm text-gray-500">

Sold: {product.quantity}

</p>


</div>






<p className="
font-bold
text-green-600
">

{product.sales} ETB

</p>





</div>



))


}



</div>



}





</div>


);


}