import { useState } from "react";
import { Gauge, Database, PackagePlus, Shield, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Sidebar = ({
  isExpanded,
  toggleSidebar,
}: {
  isExpanded: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <aside
      className={`flex flex-col h-screen px-5 py-8 overflow-y-auto border-r fixed right-0 top-0 z-[1000] bg-gray-800 text-white transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}>
      <button
        className="p-2 mb-4 text-white bg-blue-500 rounded-md"
        onClick={toggleSidebar}>
        {isExpanded ? "Collapse" : "Expand"}
      </button>

      <Link to={`/home`}>
        <img
          className={`w-auto h-15 md:h-20 rounded-full transition-all duration-300 ${
            !isExpanded ? "hidden" : "block"
          }`}
          src="/images/logo.jpg"
          alt="Logo"
        />
      </Link>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <label
              className={`px-3 text-xl ${isExpanded ? "block" : "hidden"}`}>
              گشتی
            </label>

            <Link
              to={`/home`}
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
              <Gauge />
              <span
                className={`mx-2 text-md font-medium ${
                  !isExpanded ? "hidden" : ""
                }`}>
                داشبۆرد
              </span>
            </Link>

            <Link
              to={`/home`}
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
              <Database />
              <span
                className={`mx-2 text-md font-medium ${
                  !isExpanded ? "hidden" : ""
                }`}>
                کۆگا
              </span>
            </Link>

            <Link
              to={`/home`}
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
              <PackagePlus />
              <span
                className={`mx-2 text-md font-medium ${
                  !isExpanded ? "hidden" : ""
                }`}>
                داغڵکردنی مواد
              </span>
            </Link>
          </div>

          <Separator className="!opacity-500 !rounded-lg" />

          <div className="space-y-3">
            <label
              className={`px-3 text-xl ${isExpanded ? "block" : "hidden"}`}>
              بەڕێوەبردن
            </label>

            <Link
              to={`/home`}
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
              <Shield />
              <span
                className={`mx-2 text-md font-medium ${
                  !isExpanded ? "hidden" : ""
                }`}>
                بەکارهێنەران
              </span>
            </Link>

            <Link
              to={`/home`}
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
              <UsersRound />
              <span
                className={`mx-2 text-md font-medium ${
                  !isExpanded ? "hidden" : ""
                }`}>
                کڕیارەکان
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
