import about from "../assets/Image.png";

const About = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="text-center" id="userAbout">
        <h1 className="mt-10 mb-8 text-4xl font-bold uppercase">About Me</h1>
        <h2 className="mt-5 text-2xl text-slate-600">Committed To Health Excellence</h2>
        
        <div className="flex flex-col items-center justify-center gap-8 mt-10 md:flex-row">
          <img src={about} alt="about" className="w-full max-w-sm rounded-lg md:max-w-md lg:max-w-lg " />
          
          <form className="w-full max-w-md p-6 text-left rounded-lg ">
            <p className="text-lg font-semibold">
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
            <button className="px-4 py-2 mt-5 font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
              Read More
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
