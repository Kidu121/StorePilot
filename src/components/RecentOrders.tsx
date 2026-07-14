import { useEffect, useState } from "react";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";



interface Order{

id:string;

customerName:string;

productName:string;

totalPrice:number;

orderStatus:string;

}




export default function RecentOrders(){



const [orders,setOrders]=useState<Order[]>([]);





useEffect(()=>{


const getRecentOrders = async()=>{


const q = query(

collection(db,"orders"),

orderBy(
"createdAt",
"desc"
),

limit(5)

);




const snapshot = await getDocs(q);




const data:any[]=[];



snapshot.forEach((doc)=>{


data.push({

id:doc.id,

...doc.data()

});


});



setOrders(data);



};



getRecentOrders();



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

Recent Orders

</h2>







{

orders.length === 0 ?


<p className="text-gray-500">

No orders found

</p>



:



<div className="space-y-4">



{

orders.map((order)=>(


<div

key={order.id}

className="
border
rounded-xl
p-4
flex
justify-between
items-center
"


>




<div>


<h3 className="font-bold">

{order.customerName}

</h3>



<p className="text-sm text-gray-500">

{order.productName}

</p>



</div>







<div className="text-right">



<p className="font-bold">

{order.totalPrice} ETB

</p>




<span className={`

text-sm

px-3

py-1

rounded-full


${
order.orderStatus === "Delivered"

?

"bg-green-100 text-green-600"

:

order.orderStatus === "Cancelled"

?

"bg-red-100 text-red-600"

:

"bg-yellow-100 text-yellow-600"

}

`}>


{order.orderStatus}



</span>





</div>







</div>



))


}



</div>



}








</div>


);


}