import { useState } from "react";

import ProductModal from "../components/products/ProductModal";
import ProductTable from "../components/products/ProductTable";
import SearchFilter from "../components/products/SearchFilter";


const categories = [
  {
    name: "All",
    icon: "📦"
  },
  {
    name: "Electronics",
    icon: "📱"
  },
  {
    name: "Clothing",
    icon: "👕"
  },
  {
    name: "shoes",
    icon: "👟"
  },
  {
    name: "Home",
    icon: "🏠"
  },
  {
    name: "Beauty",
    icon: "💄"
  },
  {
    name: "Other",
    icon: "📌"
  }
];



export default function Products() {


  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");





  const handleAdd = () => {

    setOpenModal(true);

  };







  return (


    <div className="space-y-6">





      {/* Header */}


      <div className="
      flex
      justify-between
      items-center
      ">


        <div>

          <h1 className="text-3xl font-bold">

            Products

          </h1>


          <p className="text-gray-500">

            Manage your inventory

          </p>


        </div>






        <button

          onClick={handleAdd}

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




      </div>









      {/* Category Cards */}


      <div className="
      grid
      grid-cols-2
      md:grid-cols-4
      lg:grid-cols-7
      gap-4
      ">



        {

          categories.map((item)=>(


            <button


              key={item.name}


              onClick={()=>{


                if(item.name === "All"){

                  setCategory("");

                }else{

                  setCategory(item.name);

                }


              }}



              className={`
              
              bg-white
              border
              rounded-2xl
              p-4
              text-center
              hover:shadow-md
              transition

              ${
                category === item.name
                ?
                "border-blue-600 bg-blue-50"
                :
                ""
              }

              `}


            >


              <div className="text-3xl">

                {item.icon}

              </div>



              <p className="
              mt-2
              font-semibold
              ">

                {item.name}

              </p>



            </button>



          ))


        }



      </div>









      {/* Search */}


      <SearchFilter


        search={search}

        setSearch={setSearch}

        category={category}

        setCategory={setCategory}

        onAdd={handleAdd}


      />









      {/* Product Table */}


      <ProductTable


        search={search}

        category={category}


      />









      {/* Modal */}


      {

        openModal && (


          <ProductModal

            close={()=>setOpenModal(false)}

          />


        )


      }







    </div>


  );

}