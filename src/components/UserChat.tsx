import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  MessageCircle,
  X,
  Send
} from "lucide-react";


import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";


import {
  onAuthStateChanged
} from "firebase/auth";


import {
  auth,
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







export default function UserChat(){



const [open,setOpen] =
useState(false);



const [message,setMessage] =
useState("");



const [messages,setMessages] =
useState<Message[]>([]);



const [sending,setSending] =
useState(false);



const bottomRef =
useRef<HTMLDivElement | null>(null);





// ===============================
// REAL TIME GET MESSAGES
// ===============================


useEffect(()=>{


let unsubscribeMessages:any;



const unsubscribeAuth =
onAuthStateChanged(

auth,

(user)=>{


if(!user)
return;



const q = query(

collection(db,"messages"),


where(

"userId",

"==",

user.uid

),


orderBy(

"createdAt",

"asc"

)

);





unsubscribeMessages =
onSnapshot(

q,

(snapshot)=>{


const data =
snapshot.docs.map((doc)=>(


{

id:doc.id,

...doc.data()

}


)) as Message[];



setMessages(data);



}


);



}


);



return ()=>{


unsubscribeAuth();


if(unsubscribeMessages){

unsubscribeMessages();

}


};



},[]);









// ===============================
// AUTO SCROLL
// ===============================


useEffect(()=>{


bottomRef.current?.scrollIntoView({

behavior:"smooth"

});


},[messages]);










// ===============================
// SEND MESSAGE
// ===============================


const sendMessage = async()=>{


if(!message.trim())
return;



const user =
auth.currentUser;



if(!user)
return;



try{


setSending(true);



await addDoc(

collection(db,"messages"),

{


userId:user.uid,


userEmail:user.email || "",


message:message,


sender:"user",


createdAt:Timestamp.now()



}

);



setMessage("");



}

catch(error){

console.log(error);

}


finally{


setSending(false);


}



};













return(


<>


<button


onClick={()=>setOpen(true)}


className="
fixed
bottom-6
right-6
bg-blue-600
text-white
w-14
h-14
rounded-full
shadow-xl
flex
items-center
justify-center
hover:scale-110
transition
z-50
"

>


<MessageCircle size={28}/>


</button>









{

open &&



<div


className="
fixed
bottom-24
right-6
w-96
bg-white
rounded-2xl
shadow-2xl
border
overflow-hidden
z-50
"


>



<div


className="
bg-blue-600
text-white
p-4
flex
justify-between
items-center
"


>


<div>


<h3 className="font-bold">

StorePilot Support

</h3>


<p className="text-xs">

Customer Service

</p>


</div>




<button

onClick={()=>setOpen(false)}

>


<X size={20}/>


</button>



</div>









<div


className="
h-80
overflow-y-auto
p-4
space-y-3
bg-gray-50
"


>


{


messages.length===0 &&


<p className="
text-gray-500
text-center
text-sm
">


Hello 👋  
How can we help you?


</p>


}







{

messages.map((msg)=>(


<div

key={msg.id}


className={`

flex

${

msg.sender==="user"

?

"justify-end"

:

"justify-start"

}

`}


>


<div


className={`

max-w-[75%]

p-3

rounded-2xl

text-sm


${

msg.sender==="user"

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

msg.sender==="user"

?

"You"

:

"Support"

}


</p>



</div>


</div>


))


}




<div ref={bottomRef}/>


</div>









<div


className="
border-t
p-3
flex
gap-2
"


>



<input


value={message}


onChange={(e)=>
setMessage(e.target.value)
}


onKeyDown={(e)=>{


if(e.key==="Enter"){

sendMessage();

}


}}


placeholder="Write message..."


className="
flex-1
border
rounded-xl
px-3
py-2
outline-none
"


/>






<button


onClick={sendMessage}


disabled={sending}


className="
bg-blue-600
disabled:bg-gray-400
text-white
p-3
rounded-xl
"


>


<Send size={18}/>


</button>




</div>






</div>


}



</>


);


}