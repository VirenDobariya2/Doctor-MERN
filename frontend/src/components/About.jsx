import about from "../assets/about.png"

const About = () => {
  return (
    <div className="text-center" id="userAbout">
      
      <h1 className="mt-10 mb-8 uppercase font-bold text-4xl">About Me</h1>
      <h1 className="mt-5 text-2xl text-slate-600">Committed To Health Excellence</h1>
      <div className="flex">
      <img src={about} alt="about"/>
      <form className="border bg-grey  w-auto  h-auto mx-auto mt-10 text-left max-w-xs md:max-w-sm lg:max-w-md bg-blue-400 shadow-lg rounded-lg overflow-hidden m-7">
      
        <p className="mt-5 mb-8 m-5 font-semibold text-2x1">
          Doctor On Demand is the trusted provider of 24/7 virtual healthcare
          for the mind and body, including urgent care, mental health,
          preventative, primary and chronic care, with access to board-certified
          physicians and licensed psychologists through a smartphone, tablet, or
          computer. 
          <br/> <p className="mt-5">The telemedicine services made available through Doctor On
          Demand® are provided by licensed physicians practicing within a group
          of independently owned professional practices collectively known as
          “Doctor On Demand Professionals”. These professional practices provide
          services via the Doctor On Demand® telehealth platform. Doctor On
          Demand, Inc. does not itself provide any physician, mental health or
          other healthcare provider services.</p>
        </p>
       
      </form>
      </div>
      </div>
    
  );
};

export default About;
