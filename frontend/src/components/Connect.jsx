import logo from "F:/MERN STACK/Complete MERN/Doctor Appoinment/frontend/src/assets/logolo.png";
import connectimg from "F:/MERN STACK/Complete MERN/Doctor Appoinment/frontend/src/assets/connectimg.png"
import { Link } from "react-scroll";

const Connect = () => {
  return (
    <div className="container mx-auto" id="userConnect">
      <div className="w-full flex justify-center my-10 mb-[-120px]">
        <div className="w-[800px] h-[200px] bg-white border-blue-500 border-2 rounded-3xl shadow-2xl flex flex-row items-center">
          <div className="flex-1 p-7">
            <h1 className="text-2xl font-bold mb-2 text-blue-500">
              Get Best & Amazing Experience With Our Professional Doctors
            </h1>
            <div className="mt-4 border h-[50px] border-blue-500 flex rounded-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 flex-grow rounded-full focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full mr-2 m-1 hover:bg-blue-600 w-24 h-10"
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
        <div className=" flex justify-around mx-20  mt-5 py-16">
          <div className="justify-center items-center mt-16">
            <img className="w-34 h-20" src={logo} atl="logo" />
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
              <a className=" cursor-pointer text-left" href="/department">
                Doctors
              </a>
              <a className=" cursor-pointer text-left" href="/appoinment">
                Appoinment
              </a>
              <a className=" cursor-pointer text-left" href="/about">
                About Us
              </a>
              <a className="cursor-pointer text-left" href="/service">
                Service
              </a>
            </div>
          </div>
          <div className="m-10">
            <h1 className="mt-10 mb-8  font-bold">Contact Us</h1>
            <div className="py-2">
              <div className="flex m-2 gap-2 text-left ">
                <h1>Call:</h1>
                <p>(237) 681-812-2555</p>
              </div>
              <div className="flex m-2 gap-2 ">
                <h1>Email:</h1>
                <p>healthcare@gmail.com</p>
              </div>
              <div className="flex m-2 gap-2 text-left ">
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
