import Cookies from "js-cookie";
import react, { useContext } from "react";
import NavBar from "../NavbarComponent";
import { WorkerPosts } from "../client/WorkerPostsRequest";

export default function DashboardClient() {
  return (
    <div>
      {Cookies.get("user") ? (
        <div className="w-full bg-gray-300 h-full flex flex-col">
          <NavBar />
          <div className="w-full  h-full flex justify-center">
            <WorkerPosts />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <div className="bg-red-600 rounded-lg flex items-center flex-col justify-center w-1/2 h-1/3">
            <h1 className="text-yellow-300 text-xl">
              You are not Authenticated{" "}
            </h1>
            <h3 className="text-yellow-300 text-xl">Kindly, Go back!</h3>
            <a
              className="font-bold flex-row flex ml-44"
              href="http://localhost:3000"
            >
              Home Page?
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
