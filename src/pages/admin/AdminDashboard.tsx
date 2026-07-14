export default function AdminDashboard() {

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>


      <p className="text-gray-500">
        Welcome back 👋 Manage your store here.
      </p>



      <div className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-5
      ">


        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-gray-500">
            Today's Sales
          </h3>

          <p className="text-2xl font-bold">
            12,500 ETB
          </p>
        </div>



        <div className="bg-white p-6 rounded-xl border">

          <h3 className="text-gray-500">
            Profit
          </h3>

          <p className="text-2xl font-bold">
            4,300 ETB
          </p>

        </div>



        <div className="bg-white p-6 rounded-xl border">

          <h3 className="text-gray-500">
            Orders
          </h3>

          <p className="text-2xl font-bold">
            25
          </p>

        </div>




        <div className="bg-white p-6 rounded-xl border">

          <h3 className="text-gray-500">
            Products
          </h3>

          <p className="text-2xl font-bold">
            180
          </p>

        </div>


      </div>


    </div>
  );
}