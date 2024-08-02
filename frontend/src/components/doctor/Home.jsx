const Home = () => {
  return (
    <>
      <div className="bg-blue-200 w-full h-full min-h-screen">
        <h1 className="font-bold text-4xl text-center pt-10">
          Doctor Dashboard
        </h1>
        <div className="flex justify-center items-center h-full">
          <div className="m-10 border box-border w-96 h-auto cursor-pointer transition-all duration-500 hover:translate-y-2 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-4 px-4 bg-[#3d3c3d]">
            <div className="text-left m-10">
              <h1 className="font-bold uppercase text-white">
                Welcome, <span className="text-blue-700">Doctor</span>
              </h1>
              <p className="mt-5 text-white">
                Here you can manage your appointments, view patient profiles,
                and access your inbox. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Fugit libero repellendus suscipit deserunt
                quos accusantium blanditiis eaque ab? Cupiditate molestias
                tempora vitae ut voluptate accusamus voluptates officiis
                voluptatem tempore enim?
              </p>
            </div>
          </div>

          <div className="card mt-28 ml-20">
            <div className="relative bg-black w-[350px] sm:h-[250px] sm:w-[450px] group transition-all duration-700 aspect-video flex items-center justify-center">
              <div className="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-full h-full absolute group-hover:-translate-y-16">
                <p className="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
                  Thank You, Doctor!
                </p>
                <p className="px-10 text-[10px] sm:text-[10px] text-gray-700">
                  Congratulations on your incredible success! Your dedication,
                  hard work, and compassionate care have made a remarkable
                  difference in the lives of so many.
                </p>
                <p className="font-serif text-[10px] sm:text-[12px] text-gray-700">
                  Wishing you a fantastic day ahead!
                </p>
                <p className="font-sans text-[10px] text-gray-700 pt-5 uppercase">
                  Health Care
                </p>
              </div>
              <button className="seal bg-rose-500 text-red-800 w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-rose-900">
                OPEN
              </button>
              <div className="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]"></div>
              <div className="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]"></div>
              <div className="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]"></div>
              <div className="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
