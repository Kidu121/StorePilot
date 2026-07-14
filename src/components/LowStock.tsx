import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";


interface Product {

  id: string;

  name: string;

  quantity: number;

  lowStockAlert: number;

  imageUrl?: string;

}



export default function LowStock() {


  const [products, setProducts] = useState<Product[]>([]);



  useEffect(() => {


    const getLowStock = async () => {


      const snapshot = await getDocs(
        collection(db, "products")
      );



      const data: Product[] = [];



      snapshot.forEach((doc) => {


        const product = doc.data() as Omit<Product, "id">;



        if (
          product.quantity <= product.lowStockAlert
        ) {


          data.push({

            id: doc.id,

            ...product

          });


        }


      });



      setProducts(data);



    };



    getLowStock();



  }, []);






  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      p-6
      "
    >


      <h2
        className="
        text-xl
        font-semibold
        mb-5
        "
      >

        Low Stock

      </h2>





      {
        products.length === 0 ?


          <p className="text-gray-500">

            No low stock products

          </p>


          :



          <div className="space-y-4">


            {
              products.map((product) => (


                <div

                  key={product.id}

                  className="
                  flex
                  items-center
                  justify-between
                  border-b
                  pb-3
                  "

                >



                  <div>


                    <p className="font-bold">

                      {product.name}

                    </p>



                    <p className="text-sm text-gray-500">

                      Stock: {product.quantity}

                    </p>


                  </div>





                  <span

                    className="
                    bg-red-100
                    text-red-600
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    "

                  >

                    Low

                  </span>




                </div>


              ))

            }



          </div>


      }



    </div>

  );


}