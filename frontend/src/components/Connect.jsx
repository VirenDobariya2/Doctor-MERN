import logo from "../assets/logolo.png";
import connectimg from "../assets/connectimg.png"
import { Link } from "react-scroll";

const Connect = () => {
  return (
    <div className="container mx-auto" id="userConnect">
      <div className="w-full flex justify-center my-10 mb-[-120px]">
        <div className="w-[800px] h-[200px] bg-white border-blue-500 border-2 rounded-3xl shadow-2xl flex flex-row items-center">
          <div className="flex-1 p-7">
            <h1 className="mb-2 text-2xl font-bold text-blue-500">
              Get Best & Amazing Experience With Our Professional Doctors
            </h1>
            <div className="mt-4 border h-[50px] border-blue-500 flex rounded-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow p-2 rounded-full focus:outline-none"
              />
              <button
                type="submit"
                className="w-24 h-10 m-1 mr-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Subscribe 
              </button>
            </div>
          </div>

          <div className="mr-10">
            <img src={connectimg} alt="logo" className="w-[250px] h-auto" />
          </div>
        </div>
      </div>

      <div className="bg-blue-200 rounded-t-[150px]">
        <div className="flex justify-around py-16 mx-20 mt-5 ">
          <div className="items-center justify-center mt-16">
            <img className="h-20 w-34" src={logo} atl="logo" />
            <p className="mt-10 mb-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br /> Eveniet eos consequatur nam vel molestias eum harum
              <br />
              laudantium magnam quae fuga, impedit sapiente aliquam <br /> at
              soluta ipsam blanditiis officiis pariatur id?
            </p>
          </div>
          <div className="m-10">
            <h1 className="mt-10 mb-8 font-bold ">Important Pages</h1>
            <div className="flex flex-col gap-5">
              <a className="text-left cursor-pointer " href="/department">
                Doctors
              </a>
              <a className="text-left cursor-pointer " href="/appoinment">
                Appoinment
              </a>
              <a className="text-left cursor-pointer " href="/about">
                About Us
              </a>
              <a className="text-left cursor-pointer" href="/service">
                Service
              </a>
            </div>
          </div>
          <div className="m-10">
            <h1 className="mt-10 mb-8 font-bold">Contact Us</h1>
            <div className="py-2">
              <div className="flex gap-2 m-2 text-left ">
                <h1>Call:</h1>
                <p>(237) 681-812-2555</p>
              </div>
              <div className="flex gap-2 m-2 ">
                <h1>Email:</h1>
                <p>healthcare@gmail.com</p>
              </div>
              <div className="flex gap-2 m-2 text-left ">
                <h1>Address:</h1>
                <p>0123 Some Place</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
