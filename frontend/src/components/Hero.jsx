
import medical from "F:/MERN STACK/Complete MERN/Doctor Appoinment/frontend/src/assets/firstimg.png";

const Hero = () => {
  return (
    <div className="container mx-auto">
    <div className="py-20" id='userHome'>
      <div className=" mx-auto px-6 md:px-12 lg:px-48">
        <div className="gap-2 flex flex-col lg:flex-row items-center ">
          <div className="lg:w-1/2 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to Health Institute | Your Trusted Healthcare Provider
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              HealthCare Medical Institute is a state-of-the-art facility dedicated
              to providing comprehensive healthcare services with compassion and
              expertise. Our team of skilled professionals is committed to
              delivering personalized care tailored to each individual needs. At
              HealthCare, we prioritize your well-being, ensuring a harmonious
              journey towards optimal health and wellness.
            </p>
            <button className="mr-5 mt-2 font-bold transition duration-300">
              <a href="/appoinment" className="border-blue-500 border-2 rounded-lg py-2 px-7 hover:bg-blue-400 hover:text-white ">Book Appoinment</a>
            </button>
          </div>
          <div className="hover:bg-inherit">
            <img src={medical} alt="hero" className="w-[550px] h-[550px] rounded-lg animate-bounce-up-down" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Hero;
