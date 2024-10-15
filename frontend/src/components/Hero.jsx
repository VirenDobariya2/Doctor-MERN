
import medical from "../assets/firstimg.png";

const Hero = () => {
  return (
    <div className="container mx-auto">
    <div className="py-20" id='userHome'>
      <div className="px-6 mx-auto md:px-12 lg:px-48">
        <div className="flex flex-col items-center gap-2 lg:flex-row ">
          <div className="max-w-xl lg:w-1/2">
            <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
              Welcome to Health Institute | Your Trusted Healthcare Provider
            </h1>
            <p className="mb-6 text-lg text-gray-600 md:text-xl">
              HealthCare Medical Institute is a state-of-the-art facility dedicated
              to providing comprehensive healthcare services with compassion and
              expertise. Our team of skilled professionals is committed to
              delivering personalized care tailored to each individual needs. At
              HealthCare, we prioritize your well-being, ensuring a harmonious
              journey towards optimal health and wellness.
            </p>
            <button className="mt-2 mr-5 font-bold transition duration-300">
              <a href="/appoinment" className="py-2 border-2 border-blue-500 rounded-lg px-7 hover:bg-blue-400 hover:text-white ">Book Appoinment</a>
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
