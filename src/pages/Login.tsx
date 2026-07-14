import { useState } from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import {
  useNavigate
} from "react-router-dom";





const Login = () => {



const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);


const navigate = useNavigate();







const handleLogin = async(e:any)=>{


e.preventDefault();



try{


setLoading(true);



// Firebase Login

const userCredential = 
await signInWithEmailAndPassword(

auth,

email,

password

);



const user = userCredential.user;






// Get role from firestore

const userRef = doc(

db,

"users",

user.uid

);



const userSnap = await getDoc(userRef);






if(userSnap.exists()){


const role = userSnap.data().role;





if(role === "admin"){


navigate("/");


}


else if(role === "user"){


navigate("/store");


}



}

else{


alert("User profile not found");


}





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

Welcome back! Login to continue

</p>



</div>









<form

onSubmit={handleLogin}

className="space-y-5"

>







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


placeholder="Enter your password"


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

"Logging in..."

:

"Login"

}



</button>







</form>









<div className="

mt-6

text-center

text-gray-500

">


Don't have an account?




<button


onClick={()=>navigate("/signup")}



className="

ml-2

text-blue-600

font-bold

hover:underline

"


>


Create Account


</button>



</div>







</div>







</div>



);


};




export default Login;