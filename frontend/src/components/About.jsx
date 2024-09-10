import about from "F:/MERN STACK/Complete MERN/Doctor Appoinment/frontend/src/assets/Image.png";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center" id="userAbout">
        <h1 className="mt-10 mb-8 uppercase font-bold text-4xl">About Me</h1>
        <h2 className="mt-5 text-2xl text-slate-600">Committed To Health Excellence</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
          <img src={about} alt="about" className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg " />
          
          <form className=" w-full max-w-md   rounded-lg p-6 text-left">
            <p className="font-semibold text-lg">
              Doctor On Demand is the trusted provider of 24/7 virtual healthcare
              for the mind and body, including urgent care, mental health,
              preventative, primary, and chronic care, with access to board-certified
              physicians and licensed psychologists through a smartphone, tablet, or
              computer.
            </p>
            <p className="mt-5">
              The telemedicine services made available through Doctor On
              Demand® are provided by licensed physicians practicing within a group
              of independently owned professional practices collectively known as
              “Doctor On Demand Professionals”. These professional practices provide
              services via the Doctor On Demand® telehealth platform. Doctor On
              Demand, Inc. does not itself provide any physician, mental health, or
              other healthcare provider services.
            </p>
            <button className="mt-5 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              Read More
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
