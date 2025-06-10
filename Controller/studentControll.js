import Student from "../models/student.js"

//getting data
export async function getStudents(req,res){
    //try.catch using for unsure functions
    try{
       const student = await Student.find() 
       res.json(student)
    }catch(error){
        res.status(500).json({
            message : "Failed to frtch students",
            error : error.message
        })
    }
    
console.log("This getting request in student")
}

//created data
export  function createStudent(req,res){
    //check Authentication
    if(req.user == null){
        res.status(403).json({
            message : "Plwase loging agian"
        })
        return // if user is null, stop the function
    }

    //check Admin 
    if(req.user.role != "admin"){
        res.status(403).json({
            message : "Please loging Admin to create a student"
        })
        return// stop the whole function when user not a admin
    }
    //create new data collect
     const student = new Student(
         {
             name : req.body.name,
             age : req.body.age,
             email : req.body.email,
         }
     )
 //save data
     student.save().then(()=>{
         res.json(
             {
                 message : "Student saved successfully"
             }
         )
     }
     ).catch(
         ()=>{
             res.json(
                 {
                     message : "Failed to save students"
                 }
             )
         }
     ) 
 }