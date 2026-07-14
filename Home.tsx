import { useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, ShieldCheck, Truck } from "lucide-react";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Navbar */}
      <nav className="
        bg-white
        shadow-sm
        px-6 md:px-12
        py-5
        flex
        justify-between
        items-center
      ">

        <div className="flex items-center gap-3">

          <div>
            <h1 className="
              text-2xl
              font-extrabold
              text-blue-600
            ">
              STOREPILOT
            </h1>

            <p className="text-xs text-gray-500">
              BY KIDUS
            </p>
          </div>


          <div className="
            flex
            items-center
            gap-1
            text-xs
            text-gray-500
            border-l
            pl-3
          ">
            🇪🇹
            <span>
              Made in Ethiopia
            </span>
          </div>


        </div>



        <div className="flex gap-3">

          <button
            onClick={() => navigate("/login")}
            className="
              px-5
              py-2
              rounded-xl
              border
              border-blue-600
              text-blue-600
              hover:bg-blue-50
            "
          >
            Login
          </button>


          <button
            onClick={() => navigate("/signup")}
            className="
              px-5
              py-2
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
            "
          >
            Create Account
          </button>

        </div>


      </nav>





      {/* Hero */}

      <section className="
        px-6 md:px-12
        py-20
        grid
        md:grid-cols-2
        gap-12
        items-center
      ">


        <div>


          <div className="
            inline-flex
            items-center
            gap-2
            bg-blue-100
            text-blue-700
            px-4
            py-2
            rounded-full
            text-sm
          ">
            🇪🇹 Proudly built in Ethiopia
          </div>



          <h1 className="
            mt-6
            text-5xl
            md:text-6xl
            font-extrabold
            text-gray-900
            leading-tight
          ">

            Smart Shopping
            <br />
            With
            <span className="text-blue-600">
              {" "}StorePilot
            </span>

          </h1>



          <p className="
            mt-6
            text-gray-500
            text-lg
            max-w-lg
          ">

            Discover quality products,
            order easily and enjoy a fast
            shopping experience with StorePilot.

          </p>



          <button
            onClick={() => navigate("/signup")}
            className="
              mt-8
              flex
              items-center
              gap-2
              bg-blue-600
              text-white
              px-8
              py-4
              rounded-2xl
              shadow-lg
              hover:bg-blue-700
            "
          >

            <ShoppingCart size={20}/>
            Start Shopping

          </button>



        </div>





        <div className="
          bg-gradient-to-br
          from-blue-100
          to-blue-200
          rounded-[40px]
          h-96
          flex
          items-center
          justify-center
        ">


          <div className="
            text-center
          ">

            <div className="
              text-9xl
            ">
              🛒
            </div>


            <p className="
              mt-4
              text-blue-700
              font-bold
            ">
              Your Digital Store Assistant
            </p>


          </div>


        </div>


      </section>







      {/* Features */}


      <section className="
        px-6 md:px-12
        py-12
      ">


        <h2 className="
          text-3xl
          font-bold
          text-center
          mb-10
        ">
          Why Choose StorePilot?
        </h2>




        <div className="
          grid
          md:grid-cols-3
          gap-6
        ">


          <div className="
            bg-white
            p-8
            rounded-3xl
            shadow-sm
          ">

            <ShoppingCart
              className="text-blue-600"
              size={35}
            />

            <h3 className="
              mt-4
              text-xl
              font-bold
            ">
              Easy Shopping
            </h3>

            <p className="text-gray-500 mt-2">
              Find and order products quickly.
            </p>

          </div>




          <div className="
            bg-white
            p-8
            rounded-3xl
            shadow-sm
          ">

            <Zap
              className="text-blue-600"
              size={35}
            />

            <h3 className="
              mt-4
              text-xl
              font-bold
            ">
              Fast Checkout
            </h3>

            <p className="text-gray-500 mt-2">
              Simple and secure payment.
            </p>

          </div>




          <div className="
            bg-white
            p-8
            rounded-3xl
            shadow-sm
          ">

            <ShieldCheck
              className="text-blue-600"
              size={35}
            />

            <h3 className="
              mt-4
              text-xl
              font-bold
            ">
              Secure Orders
            </h3>

            <p className="text-gray-500 mt-2">
              Trusted shopping experience.
            </p>

          </div>


        </div>


      </section>







      {/* Footer */}

      <footer className="
        bg-gray-900
        text-white
        text-center
        py-8
        mt-10
      ">

        <p>
          © 2026 StorePilot
        </p>

        <p className="
          text-gray-400
          text-sm
          mt-2
        ">
          Kidusyared Liku 🇪🇹
        </p>


      </footer>



    </div>
  );
}