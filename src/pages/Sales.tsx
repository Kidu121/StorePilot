import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";


type Sale = {
  id:number;
  customer:string;
  product:string;
  amount:string;
  status:string;
};



export default function Sales(){


const [sales,setSales] = useState<Sale[]>([
  {
    id:1,
    customer:"Abebe",
    product:"Laptop",
    amount:"45,000 ETB",
    status:"Paid"
  },
  {
    id:2,
    customer:"Hana",
    product:"Keyboard",
    amount:"2,500 ETB",
    status:"Pending"
  }
]);



const [open,setOpen] = useState(false);



const [form,setForm] = useState({

customer:"",
product:"",
amount:"",
status:"Paid"

});



const addSale = ()=>{


setSales([

...sales,

{
id:Date.now(),
...form
}

]);


setForm({

customer:"",
product:"",
amount:"",
status:"Paid"

});


setOpen(false);


};




const deleteSale=(id:number)=>{

setSales(

sales.filter(

(sale)=>sale.id !== id

)

);

};





return (

<div className="space-y-6">


<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold">
Sales
</h1>


<p className="text-gray-500">
Manage your sales
</p>

</div>



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
items-center
"

>

<Plus size={20}/>

Add Sale

</button>



</div>






<div className="
bg-white
rounded-2xl
border
overflow-hidden
">


<table className="w-full">


<thead className="bg-gray-50">

<tr>

<th className="p-4 text-left">
Customer
</th>


<th className="p-4 text-left">
Product
</th>


<th className="p-4 text-left">
Amount
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4">
Action
</th>


</tr>

</thead>




<tbody>


{sales.map((sale)=>(


<tr key={sale.id} className="border-t">


<td className="p-4">
{sale.customer}
</td>


<td>
{sale.product}
</td>


<td>
{sale.amount}
</td>


<td>

<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
">

{sale.status}

</span>

</td>



<td>


<button

onClick={()=>deleteSale(sale.id)}

className="text-red-600"

>

<Trash2 size={18}/>

</button>


</td>


</tr>


))}


</tbody>


</table>


</div>






{
open && (

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
">


<div className="
bg-white
p-6
rounded-2xl
w-96
space-y-4
">


<h2 className="text-xl font-bold">
Add Sale
</h2>



<input

placeholder="Customer"

className="w-full border p-3 rounded-lg"

value={form.customer}

onChange={(e)=>
setForm({...form,customer:e.target.value})
}

/>



<input

placeholder="Product"

className="w-full border p-3 rounded-lg"

value={form.product}

onChange={(e)=>
setForm({...form,product:e.target.value})
}

/>




<input

placeholder="Amount"

className="w-full border p-3 rounded-lg"

value={form.amount}

onChange={(e)=>
setForm({...form,amount:e.target.value})
}

/>



<button

onClick={addSale}

className="
w-full
bg-blue-600
text-white
py-3
rounded-xl
"

>

Save Sale

</button>



</div>


</div>

)
}



</div>

);


}