import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";

import { auth, db } from "../firebase";




export default function MyOrders(){



const [orders,setOrders]=useState<any[]>([]);





useEffect(()=>{


const user = auth.currentUser;



if(!user) return;





const q = query(

collection(db,"orders"),

where(
"customerId",
"==",
user.uid
),

orderBy(
"createdAt",
"desc"
)

);







const unsubscribe = onSnapshot(

q,

(snapshot)=>{



const data:any[]=[];




snapshot.forEach((doc)=>{


data.push({

id:doc.id,

...doc.data()

});


});



setOrders(data);



}


);






return ()=>unsubscribe();




},[]);









const statusStyle=(status:string)=>{


if(status==="Delivered")

return "bg-green-100 text-green-700";



if(status==="Cancelled")

return "bg-red-100 text-red-700";



if(status==="Processing")

return "bg-blue-100 text-blue-700";



if(status==="Out for Delivery")

return "bg-purple-100 text-purple-700";



return "bg-yellow-100 text-yellow-700";



};











return(



<div className="mt-10">





<h2 className="
text-2xl
font-bold
">

My Orders

</h2>







{

orders.length===0 ?


<p className="text-gray-500 mt-4">

No orders found

</p>



:



<div className="space-y-5 mt-5">


{


orders.map((order)=>(



<div

key={order.id}

className="
bg-white
border
rounded-2xl
p-5
shadow-sm
"

>



<div className="
flex
justify-between
items-center
">


<h3 className="font-bold">

Order #{order.id.slice(0,8)}

</h3>





<span

className={`

px-3

py-1

rounded-full

text-sm

font-semibold

${statusStyle(order.orderStatus)}

`}

>


{order.orderStatus}


</span>





</div>









<div className="mt-4 space-y-2">



<p>

🛒 Products:

<span className="font-semibold">

{order.productName}

</span>

</p>






<p>

💰 Total:

<span className="font-semibold">

{order.totalPrice} ETB

</span>

</p>






<p>

💳 Payment:

<span className="font-semibold">

{order.paymentStatus}

</span>

</p>







{

order.createdAt &&

<p className="text-sm text-gray-500">

📅

{

order.createdAt.toDate()

.toLocaleDateString()

}


</p>


}




</div>







</div>



))


}



</div>



}







</div>



);


}