import { useState } from "react";

import { db, auth } from "../firebase";

import { useCart } from "../context/CartContext";

import {
  collection,
  addDoc,
  Timestamp
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";



export default function Checkout(){


const navigate = useNavigate();


const { cart, clearCart } = useCart();




const [customerName,setCustomerName]=useState("");

const [phone,setPhone]=useState("");

const [address,setAddress]=useState("");

const [paymentStatus,setPaymentStatus]=useState(
"Cash on Delivery"
);







const totalPrice = cart.reduce(

(total,item)=>

total + (item.sellingPrice * item.quantity),

0

);







const placeOrder = async()=>{


const user = auth.currentUser;



if(!user){

alert("Please login first");

return;

}




if(
!customerName ||
!phone ||
!address ||
cart.length===0
){

alert("Please complete information");

return;

}






try{



await addDoc(

collection(db,"orders"),

{


customerId:user.uid,


customerName,


phone,


address,



products:cart.map(item=>(

{

id:item.id,

name:item.name,

buyingPrice:item.buyingPrice,

sellingPrice:item.sellingPrice,

quantity:item.quantity

}

)),



productName:

cart
.map(item=>item.name)
.join(", "),




quantity:

cart.reduce(

(total,item)=>

total + item.quantity,

0

),




totalPrice,



orderStatus:"Pending",



paymentStatus,



createdAt:Timestamp.now()



}

);





alert("Order placed successfully");



clearCart();


navigate("/profile");



}

catch(error){


console.log(error);


alert("Order failed");


}



};










return(


<div className="
max-w-xl
mx-auto
bg-white
p-6
rounded-xl
border
space-y-5
">


<h1 className="
text-3xl
font-bold
">

Checkout

</h1>








<input

placeholder="Customer Name"

value={customerName}

onChange={(e)=>
setCustomerName(e.target.value)
}

className="
border
p-3
rounded-lg
w-full
"

/>








<input

placeholder="Phone Number"

value={phone}

onChange={(e)=>
setPhone(e.target.value)
}

className="
border
p-3
rounded-lg
w-full
"

/>








<textarea

placeholder="Delivery Address"

value={address}

onChange={(e)=>
setAddress(e.target.value)
}

className="
border
p-3
rounded-lg
w-full
"

/>









<div className="
bg-gray-100
p-4
rounded-lg
">


<h2 className="font-bold">

Your Order

</h2>




{

cart.map(item=>(


<div key={item.id}>


<p>

{item.name}

</p>


<p>

{item.quantity} x {item.sellingPrice} ETB

</p>


</div>


))

}



<p className="
font-bold
mt-3
">

Total: {totalPrice} ETB

</p>



</div>









<select

value={paymentStatus}

onChange={(e)=>
setPaymentStatus(e.target.value)
}

className="
border
p-3
rounded-lg
w-full
"

>


<option>
Cash on Delivery
</option>


<option>
Paid
</option>


</select>










<button

onClick={placeOrder}

className="
bg-blue-600
text-white
p-3
rounded-lg
w-full
"

>


Place Order


</button>







</div>


);


}