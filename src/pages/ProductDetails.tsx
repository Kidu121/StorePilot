import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import UserNavbar from "../components/UserNavbar";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";

import {
  doc,
  getDoc
} from "firebase/firestore";



interface Product {

  id: string;

  name: string;

  description?: string;

  category: string;

  brand?: string;

  sku?: string;

  size?: string;

  color?: string;

  buyingPrice: number;

  sellingPrice: number;

  quantity: number;

  imageUrl: string;

}




export default function ProductDetails(){


  const { id } = useParams();


  const navigate = useNavigate();


  const { addToCart } = useCart();



  const [product,setProduct] =
    useState<Product | null>(null);




  const getProduct = async()=>{


    if(!id) return;



    const productRef = doc(
      db,
      "products",
      id
    );



    const snapshot = await getDoc(productRef);



    if(snapshot.exists()){


      setProduct({

        id:snapshot.id,

        ...snapshot.data()

      } as Product);


    }


  };





  useEffect(()=>{


    getProduct();


  },[id]);







  if(!product){


    return(

      <div
        className="
        h-screen
        flex
        items-center
        justify-center
        "
      >

        Loading...

      </div>

    );


  }







  return(


    <div className="min-h-screen bg-gray-100">


      <UserNavbar />



      <div className="p-8">



        <button

          onClick={()=>navigate("/store")}

          className="
          flex
          items-center
          gap-2
          text-blue-600
          mb-6
          "

        >

          <ArrowLeft size={20}/>

          Back To Store

        </button>







        <div
          className="
          bg-white
          rounded-2xl
          p-8
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
          "
        >





          <img

            src={product.imageUrl}

            alt={product.name}

            className="
            w-full
            h-[450px]
            object-cover
            rounded-2xl
            "

          />









          <div>


            <h1
              className="
              text-3xl
              font-bold
              "
            >

              {product.name}

            </h1>





            <p className="text-gray-500 mt-3">

              Category:
              {product.category}

            </p>







            <p
              className="
              text-3xl
              font-bold
              text-blue-600
              mt-5
              "
            >

              {product.sellingPrice} ETB

            </p>







            <div className="mt-6 space-y-3">


              <p>
                Brand:
                {product.brand || "N/A"}
              </p>


              <p>
                SKU:
                {product.sku || "N/A"}
              </p>


              <p>
                Size:
                {product.size || "N/A"}
              </p>


              <p>
                Color:
                {product.color || "N/A"}
              </p>


              <p>
                Stock:
                {product.quantity}
              </p>



            </div>








            <p className="mt-6 text-gray-600">


              {product.description ||
              "No description available"}


            </p>









            <button


              onClick={()=>


                addToCart({

                  id: product.id,

                  name: product.name,

                  category: product.category,

                  sellingPrice: product.sellingPrice,

                  buyingPrice: product.buyingPrice,

                  stock: product.quantity,

                  imageUrl: product.imageUrl


                })


              }



              className="
              mt-8
              w-full
              bg-blue-600
              text-white
              py-4
              rounded-xl
              flex
              justify-center
              items-center
              gap-2
              "

            >


              <ShoppingCart size={20}/>


              Add To Cart


            </button>






          </div>





        </div>




      </div>




    </div>


  );


}