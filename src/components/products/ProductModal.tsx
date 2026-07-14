import { useState } from "react";
import { X } from "lucide-react";

import { db } from "../../firebase";

import {
  collection,
  addDoc
} from "firebase/firestore";


type Props = {
  close: () => void;
};


export default function ProductModal({ close }: Props) {

  const [image, setImage] = useState<File | null>(null);


  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    sku: "",
    brand: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    unit: "Piece",
    lowStockAlert: "5",
    size: "",
    color: ""
  });



  const uploadImage = async (file: File) => {

    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      "storepilot"
    );


    const res = await fetch(
      "https://api.cloudinary.com/v1_1/e5grcses/image/upload",
      {
        method: "POST",
        body: data
      }
    );


    const result = await res.json();

    return result.secure_url;

  };





  const saveProduct = async () => {

    try {

      let imageUrl = "";


      if (image) {
        imageUrl = await uploadImage(image);
      }



      await addDoc(
        collection(db, "products"),
        {

          name: form.name,

          description: form.description,

          category: form.category,

          sku: form.sku,

          brand: form.brand,


          buyingPrice: Number(form.buyingPrice),

          sellingPrice: Number(form.sellingPrice),

          quantity: Number(form.quantity),


          unit: form.unit,

          lowStockAlert: Number(form.lowStockAlert),


          size: form.size,

          color: form.color,


          imageUrl,


          createdAt: new Date()

        }
      );



      alert("Product Added Successfully");


      close();


    } catch (error) {

      console.log(error);

      alert("Error adding product");

    }

  };





  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >


      <div
        className="
        bg-white
        w-[700px]
        rounded-2xl
        p-6
        "
      >


        <div
          className="
          flex
          justify-between
          items-center
          mb-5
          "
        >

          <h2 className="text-2xl font-bold">
            Add Product
          </h2>


          <button onClick={close}>
            <X />
          </button>

        </div>





        <div
          className="
          grid
          grid-cols-2
          gap-4
          "
        >


          <input
            placeholder="Product Name"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={(e)=>
              setForm({...form,name:e.target.value})
            }
          />


          <input
            placeholder="SKU / Barcode"
            className="border p-3 rounded-lg"
            value={form.sku}
            onChange={(e)=>
              setForm({...form,sku:e.target.value})
            }
          />



          <input
            placeholder="Brand"
            className="border p-3 rounded-lg"
            value={form.brand}
            onChange={(e)=>
              setForm({...form,brand:e.target.value})
            }
          />



          <select
            className="border p-3 rounded-lg"
            value={form.category}
            onChange={(e)=>
              setForm({...form,category:e.target.value})
            }
          >

            <option value="">
              Category
            </option>

            <option>Electronics</option>
            <option>Clothing</option>
            <option>shoes</option>
            <option>Home</option>
            <option>Beauty</option>
            <option>Other</option>

          </select>




          <input
            placeholder="Buying Price"
            type="number"
            className="border p-3 rounded-lg"
            value={form.buyingPrice}
            onChange={(e)=>
              setForm({...form,buyingPrice:e.target.value})
            }
          />



          <input
            placeholder="Selling Price"
            type="number"
            className="border p-3 rounded-lg"
            value={form.sellingPrice}
            onChange={(e)=>
              setForm({...form,sellingPrice:e.target.value})
            }
          />



          <input
            placeholder="Quantity"
            type="number"
            className="border p-3 rounded-lg"
            value={form.quantity}
            onChange={(e)=>
              setForm({...form,quantity:e.target.value})
            }
          />



          <select
            className="border p-3 rounded-lg"
            value={form.unit}
            onChange={(e)=>
              setForm({...form,unit:e.target.value})
            }
          >

            <option>Piece</option>
            <option>Box</option>
            <option>Kg</option>
            <option>Liter</option>

          </select>



          <input
            placeholder="Low Stock Alert"
            type="number"
            className="border p-3 rounded-lg"
            value={form.lowStockAlert}
            onChange={(e)=>
              setForm({...form,lowStockAlert:e.target.value})
            }
          />



          <input
            placeholder="Size"
            className="border p-3 rounded-lg"
            value={form.size}
            onChange={(e)=>
              setForm({...form,size:e.target.value})
            }
          />



          <input
            placeholder="Color"
            className="border p-3 rounded-lg"
            value={form.color}
            onChange={(e)=>
              setForm({...form,color:e.target.value})
            }
          />


        </div>





        <textarea

          placeholder="Description"

          className="
          border
          p-3
          rounded-lg
          w-full
          mt-4
          "

          value={form.description}

          onChange={(e)=>
            setForm({...form,description:e.target.value})
          }

        />





        <input

          type="file"

          accept="image/*"

          className="mt-4"

          onChange={(e)=>{

            if(e.target.files){

              setImage(e.target.files[0]);

            }

          }}

        />





        <button

          onClick={saveProduct}

          className="
          mt-5
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          "

        >

          Save Product

        </button>



      </div>


    </div>

  );

}