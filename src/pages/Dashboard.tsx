import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

import { db } from "../firebase";

import StatsCard from "../components/StatsCard";
import RecentOrders from "../components/RecentOrders";
import LowStock from "../components/LowStock";
import TopProducts from "../components/TopProducts";
import AdminChat from "../components/AdminChat";


export default function Dashboard(){


const [productsCount,setProductsCount]=useState(0);

const [usersCount,setUsersCount]=useState(0);

const [sales,setSales]=useState(0);

const [profit,setProfit]=useState(0);

const [ordersCount,setOrdersCount]=useState(0);


const [chartData,setChartData]=useState<any[]>([]);





useEffect(()=>{


const getDashboardData = async()=>{


// PRODUCTS

const productsSnapshot =
await getDocs(
collection(db,"products")
);


setProductsCount(
productsSnapshot.size
);






// USERS

const usersSnapshot =
await getDocs(
collection(db,"users")
);


setUsersCount(
usersSnapshot.size
);








// ORDERS

const q = query(

collection(db,"orders"),

orderBy(
"createdAt",
"desc"
)

);



const ordersSnapshot =
await getDocs(q);




let totalSales = 0;

let totalProfit = 0;



ordersSnapshot.forEach((doc)=>{


const data:any = doc.data();



totalSales +=
data.totalPrice || 0;




data.products?.forEach((item:any)=>{


totalProfit +=

(
(item.sellingPrice - item.buyingPrice)

*

item.quantity

);



});



});









// CHART DATA

const days=[

"Mon",
"Tue",
"Wed",
"Thu",
"Fri"

];



const chart = days.map((day,index)=>(


{

name:day,

sales:

ordersSnapshot.docs[index]

?

ordersSnapshot.docs[index].data().totalPrice || 0

:

0


}


));





setChartData(chart);


setSales(totalSales);


setProfit(totalProfit);



setOrdersCount(

ordersSnapshot.size

);



};



getDashboardData();



},[]);









return(


<div className="space-y-8">







<div>


<h1 className="text-3xl font-bold text-gray-900">

Welcome back 👋

</h1>



<p className="text-gray-500 mt-2">

Here's what's happening with your store today.

</p>


</div>









<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-5
gap-6
">






<StatsCard

title="Total Sales"

value={`${sales} ETB`}

trend="Real Data"

icon="💰"

/>






<StatsCard

title="Profit"

value={`${profit} ETB`}

trend="Real Data"

icon="📈"

/>







<StatsCard

title="Customers"

value={usersCount.toString()}

trend="Registered"

icon="👥"

/>







<StatsCard

title="Products"

value={productsCount.toString()}

trend="Available"

icon="📋"

/>








<StatsCard

title="Orders"

value={ordersCount.toString()}

trend="Total Orders"

icon="🛒"

/>





</div>









<div className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
">






<div className="
xl:col-span-2
bg-white
p-6
rounded-2xl
border
shadow-sm
h-80
">



<h2 className="text-xl font-semibold mb-4">

Sales Overview

</h2>







<ResponsiveContainer

width="100%"

height="90%"

>


<LineChart data={chartData}>


<CartesianGrid

strokeDasharray="3 3"

/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>




<Line

type="monotone"

dataKey="sales"

stroke="#2563eb"

strokeWidth={3}

/>



</LineChart>



</ResponsiveContainer>






</div>






<LowStock />






</div>









<div className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
">



<div className="xl:col-span-2">


<RecentOrders />


</div>




<TopProducts />




</div>



<AdminChat />




</div>


);


}