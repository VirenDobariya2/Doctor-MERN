
import Department from "../components/Department"
import Hero from "../components/Hero"
import axios from "axios"
import {useEffect} from "react"
import Navbar from "../components/Navbar"
import Connect from "../components/Connect"
import About from "../components/About"
import Service from "../components/Service"


const Home = () => {

  const getData = async()=>{
    try {
      const response = await axios.post("/api/user/get-info-by-id",{},
        {
          headers:{
            Authorization : "Bearer" + localStorage.get('token')
          }
        }
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getData()
  })
  return (
    <>
    <Navbar />
      <Hero/>  
      <Department/>
      <About/>
      <Service/> 
      <Connect/>
    
    </>
  )
}

export default Home
