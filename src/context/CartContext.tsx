import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";


export interface CartItem {

  id: string;

  name: string;

  category: string;

  buyingPrice: number;

  sellingPrice: number;

  imageUrl: string;

  quantity: number;

  stock: number;

}




interface CartContextType {


  cart: CartItem[];


  addToCart: (
    product: Omit<CartItem,"quantity">
  ) => void;



  removeFromCart: (
    id:string
  )=>void;



  increaseQuantity:(
    id:string
  )=>void;



  decreaseQuantity:(
    id:string
  )=>void;



  clearCart:()=>void;



  totalItems:number;


  totalPrice:number;



}





const CartContext =
createContext<CartContextType | undefined>(
  undefined
);





interface CartProviderProps{

children:ReactNode;

}






export function CartProvider({
children
}:CartProviderProps){



const [cart,setCart]=useState<CartItem[]>([]);








const addToCart = (

product:Omit<CartItem,"quantity">

)=>{


setCart((prev)=>{


const existing =
prev.find(
(item)=>item.id===product.id
);



if(existing){


return prev.map((item)=>

item.id===product.id

?

{

...item,

quantity:item.quantity+1

}

:

item

);


}




return [

...prev,

{

...product,

quantity:1

}

];



});



};









const removeFromCart=(id:string)=>{


setCart((prev)=>

prev.filter(
(item)=>item.id!==id
)

);


};









const increaseQuantity=(id:string)=>{


setCart((prev)=>

prev.map((item)=>{


if(item.id===id){


if(item.quantity >= item.stock){

return item;

}


return {

...item,

quantity:item.quantity+1

};


}


return item;


})

);



};









const decreaseQuantity=(id:string)=>{


setCart((prev)=>

prev.map((item)=>{


if(item.id===id){


return{

...item,

quantity:item.quantity-1

};


}


return item;


})

.filter(
(item)=>item.quantity>0
)

);



};









const clearCart=()=>{

setCart([]);

};










const totalItems = cart.reduce(

(total,item)=>

total+item.quantity,

0

);








const totalPrice = cart.reduce(

(total,item)=>

total+(item.quantity*item.sellingPrice),

0

);








return(


<CartContext.Provider


value={

{


cart,

addToCart,

removeFromCart,

increaseQuantity,

decreaseQuantity,

clearCart,

totalItems,

totalPrice


}


}


>


{children}


</CartContext.Provider>


);


}










export function useCart(){


const context =
useContext(CartContext);



if(!context){


throw new Error(
"useCart must be used inside CartProvider"
);


}



return context;



}