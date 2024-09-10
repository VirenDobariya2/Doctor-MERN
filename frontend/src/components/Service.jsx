import service from "../assets/servicedd.png";
import staff from "../assets/staff.png";
import appoinment from "../assets/Acess.png";

const Service = () => {
  return (
    <div className="text-center container mx-auto" id="userService">
      <h1 className="mt-10 uppercase font-bold text-4xl">Service</h1>
      <div className="flex gap-10 mx-28 py-10 px-10 w-auto h-auto ">
        <div className="group mt-6  overflow-hidden border-2 border-blue-400 rounded-xl transition-colors duration-300 hover:bg-blue-400">
          <div className="w-56 h-52 px-5 py-5 max-w-sm rounded">
            <img className="w-1/2 rounded-l-lg" src={staff} alt="Staff" />
          </div>
          <div className="p-5 rounded-2xl text-left">
            <span className="text-blue-500 text-2xl font-extrabold group-hover:text-white transition-colors duration-300">
              Our Staff
            </span>
            <p className="text-gray-800 font-bold mt-4 group-hover:text-white transition-colors duration-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              voluptate facilis provident incidunt delectus distinctio
              recusandae accusamus iusto nostrum sit inventore, debitis quasi
              reiciendis sapiente quia aliquam voluptas deserunt quas.
            </p>
            <button className="bg-gray-50 px-3 mt-4 py-2 rounded-xl hover:bg-sky-600 duration-300">
              See more
            </button>
          </div>
        </div>

        <div className="group mt-6  overflow-hidden border-2 border-blue-400 rounded-xl transition-colors duration-300 hover:bg-blue-400">
          <div className="w-56 h-52 px-5 py-5 max-w-sm rounded">
            <img className="rounded-l-lg" src={service} alt="Service" />
          </div>
          <div className="p-5 rounded-2xl text-left">
            <span className="text-blue-500 text-2xl font-extrabold group-hover:text-white transition-colors duration-300">
              Our Service
            </span>
            <p className="text-gray-800 font-bold mt-4 group-hover:text-white transition-colors duration-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              voluptate facilis provident incidunt delectus distinctio
              recusandae accusamus iusto nostrum sit inventore, debitis quasi
              reiciendis sapiente quia aliquam voluptas deserunt quas.
            </p>
            <button className="bg-gray-50 px-3 mt-4 py-2 rounded-xl hover:bg-sky-600 duration-300">
              See more
            </button>
          </div>
        </div>

        <div className="group mt-6  overflow-hidden border-2 border-blue-400 rounded-xl transition-colors duration-300 hover:bg-blue-400">
          <div className="w-56 h-52 px-5 py-5 max-w-sm rounded">
            <img className="rounded-l-lg" src={appoinment} alt="Appointment" />
          </div>
          <div className="p-5 rounded-2xl text-left">
            <span className="text-blue-500 text-2xl font-extrabold group-hover:text-white transition-colors duration-300">
              Appointment & Access
            </span>
            <p className="text-gray-800 font-bold mt-4 group-hover:text-white transition-colors duration-300">
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
