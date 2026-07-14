import { useEffect, useState } from "react";

import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  DollarSign
} from "lucide-react";


import { db } from "../firebase";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";



interface OrderProduct {

  name:string;

  buyingPrice:number;

  sellingPrice:number;

  quantity:number;

}




interface Order {

  customerId:string;

  products:OrderProduct[];

  totalPrice:number;

  createdAt?:any;

}







export default function Reports(){



const [sales,setSales] = useState(0);

const [profit,setProfit] = useState(0);

const [orders,setOrders] = useState(0);

const [customers,setCustomers] = useState(0);

const [loading,setLoading] = useState(true);








const getReports = async()=>{


try{


const q = query(

collection(db,"orders"),

orderBy(
"createdAt",
"desc"
)

);



const snapshot = await getDocs(q);



let totalSales = 0;

let totalProfit = 0;


let customerIds:string[]=[];




snapshot.forEach((doc)=>{


const data = doc.data() as Order;



totalSales += data.totalPrice || 0;




if(data.customerId){

customerIds.push(
data.customerId
);

}




data.products?.forEach((item)=>{


const itemProfit =

(item.sellingPrice - item.buyingPrice)

*

item.quantity;



totalProfit += itemProfit;



});



});






setSales(totalSales);


setProfit(totalProfit);


setOrders(
snapshot.size
);



setCustomers(

new Set(customerIds).size

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


getReports();


},[]);










if(loading){


return(

<div className="p-8">

Loading Reports...

</div>

);


}









return(


<div className="space-y-6">







<div>


<h1 className="text-3xl font-bold text-gray-900">

Reports

</h1>


<p className="text-gray-500 mt-2">

Analyze your store performance.

</p>


</div>









<div className="

grid

grid-cols-1

md:grid-cols-4

gap-6

">







<div className="

bg-white

p-6

rounded-2xl

border

shadow-sm

">


<div className="flex justify-between">


<p className="text-gray-500">

Total Sales

</p>


<DollarSign className="text-green-600"/>


</div>



<h2 className="text-3xl font-bold mt-3">

{sales} ETB

</h2>



</div>









<div className="

bg-white

p-6

rounded-2xl

border

shadow-sm

">



<div className="flex justify-between">


<p className="text-gray-500">

Profit

</p>


<TrendingUp className="text-blue-600"/>


</div>



<h2 className="text-3xl font-bold mt-3">

{profit} ETB

</h2>



</div>









<div className="

bg-white

p-6

rounded-2xl

border

shadow-sm

">



<div className="flex justify-between">


<p className="text-gray-500">

Orders

</p>


<ShoppingBag className="text-purple-600"/>


</div>



<h2 className="text-3xl font-bold mt-3">

{orders}

</h2>



</div>









<div className="

bg-white

p-6

rounded-2xl

border

shadow-sm

">



<div className="flex justify-between">


<p className="text-gray-500">

Customers

</p>


<Users className="text-orange-600"/>


</div>



<h2 className="text-3xl font-bold mt-3">

{customers}

</h2>



</div>








</div>









<div className="

bg-white

rounded-2xl

border

p-6

">



<h2 className="text-xl font-semibold mb-5">

Report Summary

</h2>



<div className="space-y-3">



<p>

Total Orders:
<span className="font-bold ml-2">

{orders}

</span>

</p>





<p>

Total Customers:
<span className="font-bold ml-2">

{customers}

</span>

</p>






<p>

Total Revenue:
<span className="font-bold ml-2">

{sales} ETB

</span>

</p>







<p>

Total Profit:
<span className="font-bold ml-2 text-green-600">

{profit} ETB

</span>

</p>






</div>



</div>








<div className="

bg-white

rounded-2xl

border

p-6

">



<h2 className="text-xl font-semibold mb-4">

Best Selling Products

</h2>



<p className="text-gray-500">

Product analytics will be connected after sales aggregation.

</p>




<Package className="mt-4 text-gray-400"/>



</div>







</div>


);


}