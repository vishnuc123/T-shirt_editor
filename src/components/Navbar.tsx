import  { useState } from "react"
import { Home, User, Settings, Shirt, Menu } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen 
          bg-gray-800 text-white flex flex-col 
          transition-all duration-300 ease-in-out z-40
          ${isOpen ? "w-64" : "w-20 lg:w-20 lg:hover:w-64"} 
          ${!isOpen ? "hidden lg:flex" : "flex"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-xl font-bold font-serif whitespace-nowrap transition-all duration-300 opacity-0 lg:group-hover:opacity-100">
            StitchUp
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-4">

            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <Home className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 whitespace-nowrap transition-all duration-300 opacity-0 lg:group-hover:opacity-100">
                  Dashboard
                </span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <Shirt className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 whitespace-nowrap transition-all duration-300 opacity-0 lg:group-hover:opacity-100">
                  T-Shirt Customisation
                </span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <User className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 whitespace-nowrap transition-all duration-300 opacity-0 lg:group-hover:opacity-100">
                  Users
                </span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <Settings className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 whitespace-nowrap transition-all duration-300 opacity-0 lg:group-hover:opacity-100">
                  Settings
                </span>
              </a>
            </li>

          </ul>
        </nav>
      </div>
    </>
  )
}
