// import jobs from '../jobs.json'
import { useEffect, useState } from 'react'

import JobListing from './JobListing'

import Spinner from './Spinner'
 const API_URL = import.meta.env.VITE_API_URL;
const JobListings = ({isHome = false}) => {
    // const recentJobs = jobs.slice(0,3)
  //  const joblist =   isHome ? jobs.slice(0,3) : jobs
 const [jobs, setJobs] = useState([])
 const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // const apiUrl = isHome ? 'https://job-listings-cl36.onrender.com/jobs?_limit=3' : 'https://job-listings-cl36.onrender.com/jobs'
       const apiUrl = isHome ? `${API_URL}/jobs?_limit=3` : `${API_URL}/jobs`
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setJobs(data);
      }
      catch(error) {
      console.log("Error Occured in fetching" + error)
      }
      finally{
      setLoading(false)
      }
            
      }
       fetchData();
       const interval = setInterval(fetchData, 2000); // Fetch every 5 sec

       return () => clearInterval(interval); // Cleanup on unmount

    }, [] ); 

  return (
   <>
     <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
          
        </h2>
       
         
          { loading ? ( <Spinner loading= {loading}/>) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            { jobs.map((job) => (
                 <JobListing job = {job} key={job.id}/>
          ))}
             </div>
          ) }

       
      </div>
    </section>
   </>
  )
}

export default JobListings
