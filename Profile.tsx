import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import MyOrders from "./MyOrders";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";



export default function Profile(){


const [loading,setLoading] = useState(true);

const [edit,setEdit] = useState(false);

const [name,setName] = useState("");

const [email,setEmail] = useState("");

const [phone,setPhone] = useState("");

const [address,setAddress] = useState("");

const [photo,setPhoto] = useState("");

const [uploading,setUploading] = useState(false);





// GET USER PROFILE

useEffect(()=>{


const getProfile = async()=>{


const currentUser = auth.currentUser;


if(!currentUser){
setLoading(false);
return;
}



const userRef = doc(
db,
"users",
currentUser.uid
);



const snap = await getDoc(userRef);



if(snap.exists()){


const data = snap.data();


setName(data.name || "");

setEmail(data.email || currentUser.email || "");

setPhone(data.phone || "");

setAddress(data.address || "");

setPhoto(data.photoURL || "");


}



setLoading(false);



}



getProfile();



},[]);









// UPLOAD PHOTO

const uploadImage = async(e:any)=>{


const file = e.target.files[0];


if(!file) return;



setUploading(true);



const formData = new FormData();



formData.append(
"file",
file
);



formData.append(
"upload_preset",
"storepilot"
);





try{


const res = await fetch(

"https://api.cloudinary.com/v1_1/e5grcses/image/upload",

{

method:"POST",

body:formData

}

);



const data = await res.json();



setPhoto(
data.secure_url
);



}

catch(error){

console.log(error);

alert("Photo upload failed");

}



setUploading(false);



};









// SAVE PROFILE

const saveProfile = async()=>{


const currentUser = auth.currentUser;


if(!currentUser)
return;




await updateDoc(

doc(
db,
"users",
currentUser.uid
),

{

name:name,

phone:phone,

address:address,

photoURL:photo

}

);




setEdit(false);



alert(
"Profile Updated Successfully"
);



};








if(loading){


return(

<div className="text-center mt-10">

Loading Profile...

</div>

)


}







return(


<div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">


<div className="flex flex-col items-center">



<img

src={
photo ||
"https://via.placeholder.com/150"
}

className="w-32 h-32 rounded-full object-cover"

/>




{

edit &&

<input

type="file"

accept="image/*"

onChange={uploadImage}

className="mt-4"

/>


}




{

uploading &&

<p>
Uploading photo...
</p>


}






<h1 className="text-2xl font-bold mt-4">

Customer Profile

</h1>



</div>








<div className="mt-6 space-y-4">



<div>

<label>
Name
</label>


<input

value={name}

disabled={!edit}

onChange={(e)=>
setName(e.target.value)
}

className="border w-full p-2 rounded"

/>


</div>








<div>

<label>
Email
</label>


<input

value={email}

disabled

className="border w-full p-2 rounded"

/>


</div>







<div>

<label>
Phone
</label>


<input

value={phone}

disabled={!edit}

onChange={(e)=>
setPhone(e.target.value)
}

className="border w-full p-2 rounded"

/>


</div>







<div>

<label>
Address
</label>


<input

value={address}

disabled={!edit}

onChange={(e)=>
setAddress(e.target.value)
}

className="border w-full p-2 rounded"

/>


</div>





</div>








<div className="mt-6">



{

edit ?


<button

onClick={saveProfile}

className="bg-green-600 text-white px-6 py-2 rounded"

>

Save

</button>



:



<button

onClick={()=>
setEdit(true)
}

className="bg-blue-600 text-white px-6 py-2 rounded"

>

Edit Profile

</button>



}



</div>
<div className="mt-10">

  <MyOrders />

</div>






</div>


)


}