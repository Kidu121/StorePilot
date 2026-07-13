import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="relative h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      {/* Search */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-96">
        <Search size={20} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search products, customers..."
          className="bg-transparent outline-none ml-3 w-full text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button
          onClick={() => {
            setNotificationOpen(!notificationOpen);
            setProfileOpen(false);
          }}
          className="relative"
        >
          <Bell size={22} className="text-gray-600" />

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            3
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => {
            setProfileOpen(!profileOpen);
            setNotificationOpen(false);
          }}
          className="flex items-center gap-3"
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
          >
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">
              {user?.email?.split("@")[0] || "admin"}
            </p>

            <p className="text-xs text-gray-500">Owner</p>
          </div>

          <ChevronDown size={18} className="text-gray-500" />
        </button>

        {/* Notification Dropdown */}
        {notificationOpen && (
          <div
            className="
              absolute
              right-24
              top-16
              w-80
              bg-white
              rounded-xl
              border
              border-gray-200
              shadow-xl
              z-50
              overflow-hidden
            "
          >
            <div className="px-4 py-3 border-b">
              <h2 className="font-semibold text-gray-800">
                Notifications
              </h2>
            </div>

            <div className="max-h-80 overflow-y-auto">
              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b">
                <p className="font-medium text-sm">
                  📦 Wireless Mouse stock is low
                </p>
                <p className="text-xs text-gray-500">
                  Remaining: 3 items
                </p>
              </div>

              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b">
                <p className="font-medium text-sm">
                  🛒 New Order Received
                </p>
                <p className="text-xs text-gray-500">
                  Order #1005 has been placed.
                </p>
              </div>

              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-sm">
                  👤 New Customer Registered
                </p>
                <p className="text-xs text-gray-500">
                  Samuel joined your store.
                </p>
              </div>
            </div>

            <button
              className="
                w-full
                py-3
                border-t
                text-blue-600
                hover:bg-gray-50
                font-medium
              "
            >
              View All Notifications
            </button>
          </div>
        )}

        {/* Profile Dropdown */}
        {profileOpen && (
          <div
            className="
              absolute
              right-8
              top-16
              bg-white
              border
              border-gray-200
              rounded-xl
              shadow-lg
              w-48
              p-2
              z-50
            "
          >
            <button
              onClick={() => navigate("/profile")}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-lg
                hover:bg-gray-100
              "
            >
              Profile
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-lg
                hover:bg-gray-100
              "
            >
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-lg
                text-red-600
                hover:bg-gray-100
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}