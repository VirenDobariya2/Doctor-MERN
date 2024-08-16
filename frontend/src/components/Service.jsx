import service from "../assets/servicedd.png";
import staff from "../assets/staff.png";
import appoinment from "../assets/Acess.png";

const Service = () => {
  return (
    <div className="text-center container mx-auto" id="userService">
      <h1 className="mt-24 uppercase font-bold text-4xl">Service</h1>
      <div className="flex gap-10 mx-28 py-10 px-10 w-auto h-auto ">

        <div className="group  mt-20 mb-10 overflow-hidden bg-sky-300 rounded-xl">
            <div className="w-56 h-52 px-5 py-5 max-w-sm rounded">
              <img className="w-1/2 rounded-l-lg" src={staff} />
            </div>
           
            <div className="p-5 rounded-2xl text-left ">
              <span className="text-red-800 text-2xl font-extrabold">
                {" "}
                Our Staff
              </span>
              <p className="text-gray-800 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                voluptate facilis provident incidunt delectus distinctio
                recusandae accusamus iusto nostrum sit inventore, debitis quasi
                reiciendis sapiente quia aliquam voluptas deserunt quas.
              </p>
              <button className="bg-gray-50 px-3 mb-5 mt-4 py-2 rounded-xl hover:bg-sky-600">
                See more
              </button>
            </div>         
        </div>

        <div className="group  mt-20 mb-10 overflow-hidden bg-sky-300 rounded-xl">
            <div className="w-56 h-52 px-5 py-5 max-w-sm rounded">
              <img className=" rounded-l-lg" src={service} />
            </div>
            {/* <div className="absolute bg-gray-50 z-10 top-4 left-4 opacity-50 rounded-2xl blur  group-hover:blur-none [transform:rotate3d(1_,-1,_1,_30deg)] duration-500 group-hover:[transform:rotate3d(1_,-1,_1,_0deg)]"></div> */}
            <div className=" p-5 rounded-2xl text-left ">
              <span className="text-red-800 text-2xl font-extrabold">
                {" "}
                Our Service
              </span>
              <p className="text-gray-800 font-bold text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                voluptate facilis provident incidunt delectus distinctio
                recusandae accusamus iusto nostrum sit inventore, debitis quasi
                reiciendis sapiente quia aliquam voluptas deserunt quas.
              </p>
              <button className="bg-gray-50 px-3 mb-5 mt-4 py-2 rounded-xl hover:bg-sky-600 duration-300">
                See more
              </button>
            </div>         
        </div>

        <div className="group  mt-20 mb-10 overflow-hidden bg-sky-300 rounded-xl">
            <div className="w-56 h-52 px-5 py-5 max-w-sm rounded">
              <img className=" rounded-l-lg" src={appoinment} />
            </div>
            {/* <div className="absolute bg-gray-50 z-10 top-4 left-4 opacity-50 rounded-2xl blur  group-hover:blur-none [transform:rotate3d(1_,-1,_1,_30deg)] duration-500 group-hover:[transform:rotate3d(1_,-1,_1,_0deg)]"></div> */}
            <div className="p-5 rounded-2xl text-left">
              <span className="text-red-800 text-2xl font-extrabold">
                {" "}
                Appoinment & Acess
              </span>
              <p className="text-gray-800 font-bold text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                voluptate facilis provident incidunt delectus distinctio
                recusandae accusamus iusto nostrum sit inventore, debitis quasi
                reiciendis sapiente quia aliquam voluptas deserunt quas.
              </p>
              <button className="bg-gray-50 px-3 mb-5 mt-4 py-2 rounded-xl hover:bg-sky-600 duration-300">
                See more
              </button>
            </div>         
        </div>

      </div>
    </div>
  );
};

export default Service;
