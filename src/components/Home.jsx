import React from 'react'
import Navbar from './Navbar/NAvbar'

import Main from './Main/Main'
import Services from './Services/service'
import AssistantProfile from './AssistantProfile/Assistant'
import ProjectDetails from './ProjectDetails/ProjectDetails'




const Home = () => {
  return (
    <div>
        <Navbar />
        <Main/>
        <Services />
        <AssistantProfile />
        <ProjectDetails />
    </div>
  )
}

export default Home