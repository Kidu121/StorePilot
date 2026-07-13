import { useState } from "react";
import { X } from "lucide-react";
import { db } from "../../firebase";

import {
  doc,
  updateDoc
} from "firebase/firestore";


type Product = {

id:string;

name:string;

category:string;

sellingPrice:number;

quantity:number;

};



type Props = {

product:Product;

close:()=>void;

refresh:()=>void;

};





export default function EditModal({

product,

close,

refresh

}:Props){



const [name,setName] = useState(product.name);

const [category,setCategory] = useState(product.category);

const [sellingPrice,setSellingPrice] = useState(

String(product.sellingPrice)

);


const [quantity,setQuantity] = useState(

String(product.quantity)

);







const updateProduct = async()=>{


await updateDoc(

doc(db,"products",product.id),

{


name,

category,


sellingPrice:Number(sellingPrice),


quantity:Number(quantity)



}

);



alert("Product Updated");


refresh();

close();


};







return(

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">



<div className="
bg-white
rounded-2xl
p-6
w-96
">





<div className="
flex
justify-between
mb-5
">


<h2 className="
text-xl
font-bold
">

Edit Product

</h2>



<button onClick={close}>

<X/>

</button>


</div>







<div className="space-y-3">





<input

className="
w-full
border
p-3
rounded-lg
"

value={name}

onChange={(e)=>
setName(e.target.value)
}

/>







<input

className="
w-full
border
p-3
rounded-lg
"

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

/>







<input

type="number"

className="
w-full
border
p-3
rounded-lg
"

value={sellingPrice}

onChange={(e)=>
setSellingPrice(e.target.value)
}

/>








<input

type="number"

className="
w-full
border
p-3
rounded-lg
"

value={quantity}

onChange={(e)=>
setQuantity(e.target.value)
}

/>






<button

onClick={updateProduct}

className="
w-full
bg-green-600
text-white
py-3
rounded-xl
"

>

Update Product

</button>





</div>





</div>



</div>


);


}