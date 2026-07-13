import { useState } from "react";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import {
  useNavigate
} from "react-router-dom";





const Signup = () => {



const [name,setName] = useState("");

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);



const navigate = useNavigate();







const handleSignup = async(e:any)=>{


e.preventDefault();



try{


setLoading(true);



// Create Firebase Auth user

const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user = userCredential.user;







// Save user data

await setDoc(

doc(

db,

"users",

user.uid

),

{

name:name,

email:email,

role:"user",

createdAt:new Date()

}


);






alert("Account Created Successfully ✅");



navigate("/store");





}

catch(error:any){


alert(error.message);


}

finally{


setLoading(false);


}



};











return (


<div className="

min-h-screen

flex

items-center

justify-center

bg-gradient-to-br

from-blue-600

via-purple-600

to-indigo-900

px-4

">







<div className="

w-full

max-w-md

bg-white/90

backdrop-blur-xl

rounded-3xl

shadow-2xl

p-8

">






<div className="text-center mb-8">


<h1 className="

text-4xl

font-extrabold

text-gray-900

">

StorePilot

</h1>




<p className="

text-gray-500

mt-2

">

Create your account and start shopping

</p>



</div>









<form

onSubmit={handleSignup}

className="space-y-5"

>









<div>


<label className="

text-sm

font-semibold

text-gray-700

">

Full Name

</label>



<input


type="text"


placeholder="Enter your name"


value={name}


onChange={(e)=>setName(e.target.value)}



className="

mt-2

w-full

px-5

py-3

rounded-xl

border

border-gray-200

outline-none

focus:ring-2

focus:ring-blue-500

"



/>



</div>









<div>


<label className="

text-sm

font-semibold

text-gray-700

">

Email

</label>




<input


type="email"


placeholder="Enter your email"


value={email}


onChange={(e)=>setEmail(e.target.value)}



className="

mt-2

w-full

px-5

py-3

rounded-xl

border

border-gray-200

outline-none

focus:ring-2

focus:ring-blue-500

"



/>



</div>









<div>


<label className="

text-sm

font-semibold

text-gray-700

">

Password

</label>




<input


type="password"


placeholder="Create password"


value={password}


onChange={(e)=>setPassword(e.target.value)}



className="

mt-2

w-full

px-5

py-3

rounded-xl

border

border-gray-200

outline-none

focus:ring-2

focus:ring-blue-500

"



/>



</div>









<button


type="submit"


disabled={loading}



className="

w-full

py-3

rounded-xl

bg-gradient-to-r

from-blue-600

to-purple-600

text-white

font-bold

text-lg

shadow-lg

hover:scale-105

transition

duration-300

disabled:opacity-50

"

>



{

loading

?

"Creating Account..."

:

"Create Account"

}



</button>







</form>









<p className="

text-center

text-gray-500

mt-6

">


Already have an account?



<button


onClick={()=>navigate("/login")}



className="

ml-2

text-blue-600

font-bold

hover:underline

"


>


Login


</button>


</p>







</div>






</div>


);


};





export default Signup;