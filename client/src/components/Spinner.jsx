import  logo  from '../assets/images/logo.png'
import { CircleLoader } from 'react-spinners'
const Spinner = ({loading}) => {
  return (
    <>
          <CircleLoader color="#4338CA" loading= "{loading}" cssOverride={{display: "block", margin: "100px auto",  borderColor: "red"}}  size={150}
       />
    </>
  )
}

export default Spinner
