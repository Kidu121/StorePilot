import { useState } from "react";
import { Search, Plus, Trash2, Edit } from "lucide-react";


type Customer = {
  id:number;
  name:string;
  phone:string;
  email:string;
  address:string;
  type:string;
  date:string;
};



export default function Customers(){


const [customers,setCustomers] = useState<Customer[]>([

{
id:1,
name:"Abebe Kebede",
phone:"0911000000",
email:"abebe@gmail.com",
address:"Addis Ababa",
type:"Regular",
date:"2026-07-08"
},

{
id:2,
name:"Mekdes Alemu",
phone:"0922000000",
email:"mekdes@gmail.com",
address:"Adama",
type:"VIP",
date:"2026-07-08"
}

]);



const [search,setSearch] = useState("");

const [open,setOpen] = useState(false);



const [form,setForm] = useState({

name:"",
phone:"",
email:"",
address:"",
type:"Regular"

});




const addCustomer = ()=>{


setCustomers([

...customers,

{
id:Date.now(),
...form,
date:new Date().toISOString().slice(0,10)
}

]);


setOpen(false);


setForm({

name:"",
phone:"",
email:"",
address:"",
type:"Regular"

});


};




const filtered = customers.filter((customer)=>

customer.name
.toLowerCase()
.includes(search.toLowerCase())

);





return (

<div className="space-y-6">



<div className="flex justify-between">


<h1 className="text-3xl font-bold">
Customers
</h1>


<button

onClick={()=>setOpen(true)}

className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
flex
gap-2
"

>

<Plus size={20}/>

Add Customer

</button>


</div>





<div className="bg-white p-4 rounded-xl border flex">

<Search/>

<input

placeholder="Search customer..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="ml-3 outline-none w-full"

/>

</div>






<table className="w-full bg-white rounded-xl overflow-hidden">


<thead className="bg-gray-50">

<tr>

<th className="p-4 text-left">
Name
</th>

<th className="p-4 text-left">
Phone
</th>

<th className="p-4 text-left">
Email
</th>

<th className="p-4 text-left">
Type
</th>

<th className="p-4 text-left">
Date
</th>

<th>
Action
</th>

</tr>

</thead>




<tbody>


{filtered.map((customer)=>(

<tr key={customer.id} className="border-t">


<td className="p-4">
{customer.name}
</td>


<td>
{customer.phone}
</td>


<td>
{customer.email}
</td>


<td>
{customer.type}
</td>


<td>
{customer.date}
</td>



<td className="flex gap-3 p-4">


<button className="text-blue-600">

<Edit size={18}/>

</button>



<button

onClick={()=>setCustomers(

customers.filter(
(c)=>c.id!==customer.id
)

)}

className="text-red-600"

>

<Trash2 size={18}/>

</button>


</td>


</tr>


))}


</tbody>


</table>






{open && (

<div className="
fixed inset-0
bg-black/40
flex items-center justify-center
">


<div className="
bg-white
p-6
rounded-xl
w-96
space-y-3
">


<h2 className="text-xl font-bold">
Add Customer
</h2>


<input
placeholder="Name"
className="w-full border p-3 rounded"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>


<input
placeholder="Phone"
className="w-full border p-3 rounded"
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>


<input
placeholder="Email"
className="w-full border p-3 rounded"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>


<input
placeholder="Address"
className="w-full border p-3 rounded"
onChange={(e)=>setForm({...form,address:e.target.value})}
/>


<select

className="w-full border p-3 rounded"

onChange={(e)=>setForm({...form,type:e.target.value})}

>

<option>
Regular
</option>

<option>
VIP
</option>

</select>



<button

onClick={addCustomer}

className="
w-full
bg-blue-600
text-white
py-3
rounded
"

>

Save

</button>


</div>


</div>

)}



</div>

);

}