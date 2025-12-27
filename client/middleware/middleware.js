



export const authsignup = async(req ,res ,next)=>{
    try {

      const {name,email,number,password} =req.body
      if(!name||!email||!number||!password){
        return res.status(400).json({success:false,Message:"all filed required please"})
      }
      if(name.length<3){
        return res.status(400).json({Message:"name should be least 3characters"})
      }

      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if(email!==emailRegex){
        return res.status(400).json({message:"please enter valid email "})
      }
      
      const phoneRegex = /^[6-9]\d{9}$/
      if(!phoneRegex.test(phone)){
        return res.status(400).json({message:"invalid phone number"})
      }



    if(password.length<4){
        return res.status(400).json({message:"password must be 4 "})
    }
    const passowrdRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!passowrdRegex.test(password)){
        return res.status(400).json({message:"invalid password"})
    }


      next()
    } catch (error) {
        return res.status(400).json({message:"middleware error"})
    }
}