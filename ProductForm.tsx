import { useState } from "react";
import { db } from "../../firebase";

import {
  collection,
  addDoc
} from "firebase/firestore";


export default function ProductForm(){

  const [open,setOpen] = useState(false);


  const [form,setForm] = useState({

    name:"",
    description:"",
    category:"",
    sku:"",
    brand:"",
    buyingPrice:"",
    sellingPrice:"",
    quantity:"",
    unit:"Piece",
    lowStockAlert:"5",
    size:"",
    color:""

  });


  const productsRef = collection(db,"products");


  const addProduct = async()=>{


    if(
      !form.name ||
      !form.category ||
      !form.buyingPrice ||
      !form.sellingPrice ||
      !form.quantity
    ){

      alert("Please fill required fields");
      return;

    }


    await addDoc(productsRef,{

      name:form.name,

      description:form.description,

      category:form.category,

      sku:form.sku,

      brand:form.brand,

      buyingPrice:Number(form.buyingPrice),

      sellingPrice:Number(form.sellingPrice),

      quantity:Number(form.quantity),

      unit:form.unit,

      lowStockAlert:Number(form.lowStockAlert),

      size:form.size,

      color:form.color,

      imageUrl:""


    });


    setForm({

      name:"",
      description:"",
      category:"",
      sku:"",
      brand:"",
      buyingPrice:"",
      sellingPrice:"",
      quantity:"",
      unit:"Piece",
      lowStockAlert:"5",
      size:"",
      color:""

    });


    setOpen(false);


    alert("Product Added Successfully");


  };



  return (

    <div>


      <button

        onClick={()=>setOpen(!open)}

        className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        "

      >

        + Add Product

      </button>




      {
        open && (

          <div className="
          mt-5
          bg-white
          p-6
          rounded-xl
          border
          "
          >


          <div className="
          grid
          grid-cols-3
          gap-4
          ">


          <input
          placeholder="Product Name"
          className="border p-3 rounded-lg"
          value={form.name}
          onChange={(e)=>
            setForm({...form,name:e.target.value})
          }
          />


          <input
          placeholder="Description"
          className="border p-3 rounded-lg"
          value={form.description}
          onChange={(e)=>
            setForm({...form,description:e.target.value})
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

            <option>
              Electronics
            </option>

            <option>
              Clothing
            </option>

            <option>
              <script></script>hoes
            </option>

            <option>
              Home
            </option>

            <option>
              Other
            </option>

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

            <option>
              Piece
            </option>

            <option>
              Box
            </option>

            <option>
              Kg
            </option>

            <option>
              Liter
            </option>

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




          <button

          onClick={addProduct}

          className="
          mt-5
          bg-green-600
          text-white
          px-8
          py-3
          rounded-xl
          "

          >

            Save Product

          </button>


          </div>

        )
      }


    </div>

  );

}