import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";

import EditModal from "./EditModal";

import { db } from "../../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";


type Props = {
  search: string;
  category: string;
};



interface Product {

  id: string;

  name: string;

  description?: string;

  category: string;

  sku: string;

  brand: string;

  buyingPrice: number;

  sellingPrice: number;

  quantity: number;

  unit: string;

  lowStockAlert: number;

  size?: string;

  color?: string;

  imageUrl?: string;

}







export default function ProductTable({
  search,
  category
}: Props) {



  const [products,setProducts] = useState<Product[]>([]);


  const [selectedProduct,setSelectedProduct] =
    useState<Product | null>(null);






  const getProducts = async()=>{


    const snapshot = await getDocs(

      collection(db,"products")

    );



    const productsData = snapshot.docs.map((item)=>(

      {

        id:item.id,

        ...item.data()

      }

    )) as Product[];



    setProducts(productsData);


  };








  useEffect(()=>{


    getProducts();


  },[]);









  const deleteProduct = async(id:string)=>{


    const confirmDelete = window.confirm(
      "Delete this product?"
    );


    if(!confirmDelete) return;



    await deleteDoc(

      doc(db,"products",id)

    );



    getProducts();


  };









  const filteredProducts = products.filter(

    (product)=>{


      const searchMatch =

      product.name
      .toLowerCase()
      .includes(search.toLowerCase());




      const categoryMatch =

      category === ""

      ||

      product.category === category;




      return searchMatch && categoryMatch;


    }

  );









  return (


    <>



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
              Image
            </th>


            <th className="p-4 text-left">
              Product
            </th>


            <th className="p-4 text-left">
              Category
            </th>


            <th className="p-4 text-left">
              Buying
            </th>


            <th className="p-4 text-left">
              Selling
            </th>


            <th className="p-4 text-left">
              Stock
            </th>


            <th className="p-4">
              Action
            </th>


          </tr>


        </thead>







        <tbody>



        {

        filteredProducts.map((product)=>(



          <tr

          key={product.id}

          className="border-t"

          >





          <td className="p-4">


          {

          product.imageUrl ?


          <img

          src={product.imageUrl}

          className="
          w-14
          h-14
          rounded-lg
          object-cover
          "

          />


          :

          <span>
          No Image
          </span>


          }


          </td>









          <td className="p-4">


          <p className="font-bold">

          {product.name}

          </p>


          <p className="text-sm text-gray-500">

          SKU: {product.sku}

          </p>


          <p className="text-sm text-gray-500">

          Brand: {product.brand}

          </p>


          </td>









          <td className="p-4">

          {product.category}

          </td>









          <td className="p-4">

          {product.buyingPrice} ETB

          </td>









          <td className="p-4">

          {product.sellingPrice} ETB

          </td>









          <td className="p-4">



          {

          product.quantity <= product.lowStockAlert ?


          <span className="
          bg-red-100
          text-red-600
          px-3
          py-1
          rounded-full
          ">


          {product.quantity} Low


          </span>


          :


          <span>


          {product.quantity} {product.unit}


          </span>


          }


          </td>









          <td className="
          flex
          gap-3
          p-4
          ">



          <button

          onClick={()=>setSelectedProduct(product)}

          className="text-blue-600"

          >

          <Pencil size={18}/>

          </button>








          <button

          onClick={()=>deleteProduct(product.id)}

          className="text-red-600"

          >

          <Trash2 size={18}/>

          </button>





          </td>






          </tr>



        ))


        }



        </tbody>



      </table>




    </div>









    {


    selectedProduct && (


    <EditModal

    product={selectedProduct}

    close={()=>setSelectedProduct(null)}

    refresh={getProducts}

    />


    )


    }



    </>


  );


}