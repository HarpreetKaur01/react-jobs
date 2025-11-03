import express from "express";
import cors from  "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
// import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
const app = express();
app.use(express.json()) // to use req.body we need this 

app.use(cors());

// app.use("/jobs", jobRoutes);
const jobSchema = new mongoose.Schema({
      id: String,
      title: String,
      type: String,
      description: String,
      location: String,
      salary: String,
      company: {
        name: String,
        description: String,
        contactEmail: String,
        contactPhone: String
      }
});


const Job = mongoose.model('Job', jobSchema)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/jobs/', async (req, res) => {
    // res.json({msg : "Welcome to the app"})
    try {
        const jobs = await Job.find()
        res.status(200).json(jobs);
    } catch (error) {
        console.log(error)
    }
})

app.get('/jobs/:id', async(req, res) =>
{
  //  res.json({msg: "single user retreived"})
    const {id } = req.params;
    try {
        const job = await Job.findById(id)
        res.status(200).json(job);
    } catch (error) {
        console.log(error)
    }
})

app.post('/jobs/', async (req, res) => {
    const {title, type,  description, location, salary, company} = req.body;
    try {
        const job = await Job.create({ title, type,  description, location, salary, company});
        res.status(200).json(job)
    } catch (error) {
        console.log(error)
    }
        // res.json({msg: "user added"})
})

app.delete('/jobs/:id', async (req, res) =>
{
   // res.json({msg: "single user deleted"})
    const {id } = req.params;
    try {
        const deletedJob = await Job.findByIdAndDelete(id)
        res.status(200).json(deletedJob);
    }   catch (error) {
        console.log(error)
    }
})

app.patch('/jobs/:id',async (req, res) => {
    
    const {id } = req.params;
    try {
        const updatedJob = await Job.findByIdAndUpdate(id,  req.body, {new: true, runValidators : true})
        res.status(200).json(updatedJob);
    } catch (error) {
        console.log(error)
    }
})


// Connect to database 
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => console.log(`🚀  Server running on port ${process.env.PORT}!!!`));
    console.log("Connected to database");
})
.catch((err) => {
    console.log(`Error in concceting with database ${err}`)
})

