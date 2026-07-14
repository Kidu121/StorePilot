import UserNavbar from "../components/UserNavbar";

import {
  Trash2,
  Plus,
  Minus
} from "lucide-react";

import { useCart } from "../context/CartContext";

import { useNavigate } from "react-router-dom";


export default function Cart(){


  const navigate = useNavigate();


  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice
  } = useCart();





  return (

    <div className="min-h-screen bg-gray-100">


      <UserNavbar />



      <div className="p-8 space-y-6">



        <h1 className="text-3xl font-bold">

          Shopping Cart

        </h1>





        {
          cart.length === 0 ?


          (

            <div className="
            bg-white
            p-8
            rounded-2xl
            text-center
            ">

              <p className="text-gray-500">

                Your cart is empty

              </p>


            </div>


          )


          :



          (


          <div className="grid lg:grid-cols-3 gap-6">





            {/* Cart Items */}


            <div className="
            lg:col-span-2
            space-y-4
            ">



              {
                cart.map((item)=>(


                  <div

                  key={item.id}

                  className="
                  bg-white
                  rounded-2xl
                  p-4
                  flex
                  items-center
                  justify-between
                  "

                  >





                    <div className="flex gap-4">


                      {

                        item.imageUrl && (

                          <img

                          src={item.imageUrl}

                          className="
                          w-24
                          h-24
                          rounded-xl
                          object-cover
                          "

                          />

                        )

                      }



                      <div>


                        <h2 className="font-bold">

                          {item.name}

                        </h2>



                        <p className="text-blue-600 font-bold">

                          {item.sellingPrice} ETB

                        </p>





                        <div className="
                        flex
                        items-center
                        gap-3
                        mt-3
                        ">


                          <button

                          onClick={()=>
                            decreaseQuantity(item.id)
                          }

                          className="
                          border
                          p-2
                          rounded-lg
                          "

                          >

                            <Minus size={16}/>

                          </button>




                          <span>

                            {item.quantity}

                          </span>





                          <button

                          onClick={()=>
                            increaseQuantity(item.id)
                          }

                          className="
                          border
                          p-2
                          rounded-lg
                          "

                          >

                            <Plus size={16}/>

                          </button>


                        </div>



                      </div>



                    </div>






                    <button

                    onClick={()=>
                      removeFromCart(item.id)
                    }

                    className="text-red-600"

                    >

                      <Trash2 />

                    </button>






                  </div>



                ))
              }



            </div>








            {/* Summary */}



            <div className="
            bg-white
            rounded-2xl
            p-6
            h-fit
            ">



              <h2 className="text-xl font-bold">

                Order Summary

              </h2>





              <div className="
              flex
              justify-between
              mt-5
              ">


                <span>

                  Total

                </span>



                <span className="
                font-bold
                text-blue-600
                ">

                  {totalPrice} ETB

                </span>


              </div>







              <button

              onClick={()=>
                navigate("/checkout")
              }


              className="
              mt-6
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              "

              >

                Checkout

              </button>



            </div>






          </div>


          )

        }





      </div>



    </div>

  );

}