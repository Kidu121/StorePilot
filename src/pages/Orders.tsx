import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query
} from "firebase/firestore";



interface Order {

  id:string;

  customerName:string;

  phone:string;

  address:string;

  productName:string;

  quantity:number;

  totalPrice:number;

  orderStatus:string;

  paymentStatus:string;

  createdAt?:any;

}




export default function Orders(){


const [orders,setOrders] = useState<Order[]>([]);

const [loading,setLoading] = useState(true);





const getOrders = async()=>{


try{


const q = query(

collection(db,"orders"),

orderBy("createdAt","desc")

);



const snapshot = await getDocs(q);



setOrders(

snapshot.docs.map((item)=>(

{

id:item.id,

...item.data()

} as Order


))

);



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};








useEffect(()=>{


getOrders();


},[]);









const updateOrderStatus = async(

id:string,

status:string

)=>{


await updateDoc(

doc(db,"orders",id),

{

orderStatus:status

}

);



getOrders();


};









const updatePaymentStatus = async(

id:string,

status:string

)=>{


await updateDoc(

doc(db,"orders",id),

{

paymentStatus:status

}

);



getOrders();


};










const deleteOrder = async(id:string)=>{


const confirmDelete = window.confirm(

"Delete this order?"

);



if(!confirmDelete) return;



await deleteDoc(

doc(db,"orders",id)

);



getOrders();


};









if(loading){


return (

<div className="p-8">

Loading orders...

</div>

);


}








return(


<div className="space-y-6">





<h1 className="text-3xl font-bold">

Orders Management

</h1>








<div className="bg-white rounded-2xl border overflow-hidden">



<table className="w-full">



<thead className="bg-gray-50">


<tr>


<th className="p-4 text-left">
Customer
</th>


<th className="p-4 text-left">
Product
</th>


<th className="p-4">
Qty
</th>


<th className="p-4">
Total
</th>


<th className="p-4">
Payment
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>








<tbody>



{


orders.length === 0 ?


<tr>

<td

colSpan={7}

className="p-6 text-center"

>

No Orders Found

</td>

</tr>


:


orders.map((order)=>(



<tr

key={order.id}

className="border-t"

>






<td className="p-4">


<p className="font-bold">

{order.customerName}

</p>


<p className="text-sm text-gray-500">

📞 {order.phone}

</p>


<p className="text-sm text-gray-500">

📍 {order.address}

</p>


</td>









<td className="p-4">


{order.productName}


</td>







<td className="p-4 text-center">

{order.quantity}

</td>









<td className="p-4 font-bold">

{order.totalPrice} ETB

</td>









<td className="p-4">


<select


value={order.paymentStatus}


onChange={(e)=>

updatePaymentStatus(

order.id,

e.target.value

)

}


className="border rounded-lg p-2"


>


<option>
Pending
</option>


<option>
Paid
</option>


<option>
Cash on Delivery
</option>


</select>


</td>









<td className="p-4">


<select


value={order.orderStatus}


onChange={(e)=>

updateOrderStatus(

order.id,

e.target.value

)

}


className="border rounded-lg p-2"


>


<option>
Pending
</option>


<option>
Processing
</option>


<option>
Out for Delivery
</option>


<option>
Delivered
</option>


<option>
Cancelled
</option>


</select>


</td>









<td className="p-4">


<button


onClick={()=>deleteOrder(order.id)}


className="text-red-600"


>

Delete

</button>


</td>







</tr>



))


}



</tbody>



</table>



</div>





</div>


);


}