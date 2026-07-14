import { 
  useEffect, 
  useState, 
  useRef 
} from "react";


import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";


import {
  Send
} from "lucide-react";


import {
  db
} from "../firebase";





interface Message {

  id:string;

  userId:string;

  userEmail:string;

  message:string;

  sender:"user" | "admin";

  createdAt:any;

}




interface Customer {

  userId:string;

  email:string;

}








export default function AdminChat(){



const [customers,setCustomers] =
useState<Customer[]>([]);



const [messages,setMessages] =
useState<Message[]>([]);



const [selectedUser,setSelectedUser] =
useState("");



const [selectedEmail,setSelectedEmail] =
useState("");



const [reply,setReply] =
useState("");



const bottomRef =
useRef<HTMLDivElement | null>(null);









// =======================
// GET CUSTOMERS
// =======================


useEffect(()=>{


const q = query(

collection(db,"messages"),

orderBy(
"createdAt",
"asc"
)

);



const unsubscribe = onSnapshot(

q,

(snapshot)=>{


const list:Customer[]=[];



snapshot.docs.forEach((doc)=>{


const data:any = doc.data();



if(
data.userId &&
data.userEmail
){



const exists =
list.find(

(item)=>

item.userId === data.userId

);



if(!exists){


list.push({

userId:data.userId,

email:data.userEmail

});


}



}



});



setCustomers(list);



}


);



return unsubscribe;



},[]);












// =======================
// GET SELECTED USER CHAT
// =======================


useEffect(()=>{


if(!selectedUser){

setMessages([]);

return;

}




const q = query(


collection(db,"messages"),



where(

"userId",

"==",

selectedUser

),



orderBy(

"createdAt",

"asc"

)



);





const unsubscribe = onSnapshot(

q,

(snapshot)=>{


const data = snapshot.docs.map((doc)=>(

{


id:doc.id,

...doc.data()


}


)) as Message[];   // FIXED HERE



setMessages(data);



}


);



return unsubscribe;



},[selectedUser]);











// AUTO SCROLL


useEffect(()=>{


bottomRef.current?.scrollIntoView({

behavior:"smooth"

});


},[messages]);











// =======================
// ADMIN SEND REPLY
// =======================


const sendReply = async()=>{


if(!reply.trim()) return;


if(!selectedUser) return;





await addDoc(

collection(db,"messages"),

{


userId:selectedUser,


userEmail:selectedEmail,


message:reply,


sender:"admin",


createdAt:Timestamp.now()


}



);



setReply("");



};












return(


<div className="

bg-white

rounded-2xl

border

shadow-sm

p-5

grid

grid-cols-3

gap-5

">







{/* CUSTOMER LIST */}



<div className="

border-r

pr-4

">



<h2 className="

font-bold

text-xl

mb-4

">

Customers

</h2>







{

customers.length===0 &&

<p className="text-gray-500">

No customers yet

</p>

}








{

customers.map((customer)=>(



<button


key={customer.userId}



onClick={()=>{


setSelectedUser(customer.userId);


setSelectedEmail(customer.email);


}}



className={`

w-full

text-left

p-3

rounded-xl

mb-2


${

selectedUser===customer.userId

?

"bg-blue-100"

:

"bg-gray-100"

}

`}


>


{customer.email}



</button>



))


}




</div>












{/* CHAT AREA */}



<div className="col-span-2">





<h2 className="

font-bold

text-lg

mb-4

">


{

selectedEmail

?

selectedEmail

:

"Select Customer"

}


</h2>








<div className="

h-96

overflow-y-auto

bg-gray-50

rounded-xl

p-4

space-y-3

">





{

messages.map((msg)=>(



<div

key={msg.id}

className={`

flex

${

msg.sender==="admin"

?

"justify-end"

:

"justify-start"

}

`}


>




<div className={`

max-w-xs

p-3

rounded-xl


${

msg.sender==="admin"

?

"bg-blue-600 text-white"

:

"bg-white border"

}

`}


>


<p>

{msg.message}

</p>




<p className="

text-xs

opacity-70

mt-1

">


{

msg.sender==="admin"

?

"Admin"

:

"Customer"

}


</p>



</div>




</div>



))


}




<div ref={bottomRef}/>



</div>












<div className="

flex

gap-2

mt-4

">





<input


value={reply}


onChange={(e)=>setReply(e.target.value)}



placeholder="Reply customer..."



className="

flex-1

border

rounded-xl

px-3

"



/>







<button


onClick={sendReply}



className="

bg-blue-600

text-white

p-3

rounded-xl

"


>


<Send size={18}/>


</button>





</div>







</div>







</div>


);



}