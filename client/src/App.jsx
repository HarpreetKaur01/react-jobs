import {Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, useParams} from 'react-router-dom'
  
// import Navbar from "./components/Navbar"
// import Hero from "./components/Hero"
// import HomeCards from "./components/HomeCards"
// import JobListings from "./components/JobListings"
// import ViewAllJobs from "./components/ViewAllJobs"
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import AddJobsPage from './pages/AddJobPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, { jobLoader } from './pages/JobPage'
import EditJobPage from './pages/EditJobPage'

const API_URL = import.meta.env.VITE_API_URL;
const App = () => {

  const addJob = async (newJob) => { 
    const res = await fetch(`${API_URL}/jobs` , {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newJob),
    });
    return;
  }

  const deleteJob = async (id) =>{
    const res = await fetch(`${API_URL}/jobs/${id}` , {
      method: 'DELETE'

    });
    return;
  }

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`${API_URL}/jobs/${job._id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json',},
      body:  JSON.stringify(job),
    } );
    
    return;
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
         <Route index element={<HomePage/>}/>
         <Route path='jobs' element={<JobsPage/>}/>
         <Route path='add-job' element={<AddJobsPage addJobSubmit = {addJob}/>}/>
         <Route path='edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/> } loader= {jobLoader}/>
         <Route path='jobs/:id' element={<JobPage deleteJob= {deleteJob}/> } loader= {jobLoader}/>
         <Route path='*' element={<NotFoundPage/>}/>
    </Route>
   ))
   
  // return (
  //   <>
  //   <Navbar/>
  //   {/* <!-- Hero --> */}
  //   <Hero/>

  //   {/* <!-- Developers and Employers --> */}
  //   <HomeCards/>

  //   {/* <!-- Browse Jobs --> */}
  //   <JobListings/>

  //  <ViewAllJobs/>
  //   </>
  // )

  return <RouterProvider router={router} />;
}

export default App
