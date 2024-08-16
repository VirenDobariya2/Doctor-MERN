import logo from "../assets/logo.png";
import { Link } from "react-scroll";

const Connect = () => {
  return (
    <div className="container mx-auto" id="userConnect">
      <div className="bg-blue-900">
        <div className=" flex justify-around mx-20  mt-12 py-16">
          <div className="justify-center items-center text-white">
            <img className="w-28 h-20" src={logo} atl="logo" />
            <p className="mt-10 mb-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br /> Eveniet eos consequatur nam vel molestias eum harum
              <br />
              laudantium magnam quae fuga, impedit sapiente aliquam <br /> at
              soluta ipsam blanditiis officiis pariatur id?
            </p>
          </div>
          <div className="m-10">
            <h1 className="mt-2 mb-8 text-white font-bold ">Important Pages</h1>
            <div className="flex flex-col gap-5 text-white">
              <a className=" cursor-pointer text-left" href="/department">Doctors</a>
              <a className=" cursor-pointer text-left" href="/appoinment">
                Appoinment
              </a>
              <a className=" cursor-pointer text-left" href="/about">About Us</a>
              <a className="cursor-pointer text-left" href="/service">Service</a>
            </div>
          </div>
          <div className="m-10">
            <h1 className="mt-2 mb-8 text-white font-bold" >Contact Us</h1>
            <div className="py-2">
              <div className="flex m-2 gap-2 text-left text-white">
                <h1>Call:</h1>
                <p>(237) 681-812-2555</p>
              </div>
              <div className="flex m-2 gap-2 text-white">
                <h1>Email:</h1>
                <p>healthcare@gmail.com</p>
              </div>
              <div className="flex m-2 gap-2 text-left text-white">
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
