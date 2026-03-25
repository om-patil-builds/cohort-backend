const express = require ("express")

const userModel = require("../model/user.model")

const authRouter = express.Router()

const crypto = require ("crypto");

const jwt = require ("jsonwebtoken")


authRouter.post('/register', async(req,res)=>{
    
    const {name , email , password} = req.body //desc data which came posmn and save it req.body

    const isUserExists = await userModel.findOne ({email})
    if(isUserExists){
        return res.status(409).json({
            message:"user already have account"
        })
    }
    const user = await userModel.create({
        name , 
        email , 
        password: crypto.createHash('sha256').update(password).digest('hex')
    }) //user db mdhe create hoto

const token = jwt.sign({
    id:user._id,
    email: user.email

    //token magat user cha aasa data je unique assayla pahije
}
, process.env.JWT_SECRET,{expiresIn:"1h"}
//jo token create hot aahe to 1hr nantr expi hoil mhanje he te token aahe je user ne reg kelya nantr server create karun user la det . mhanjech hya token used kart user 1hr parent req karel server la . aani 1hr nantr user la parat login karav lagel
)

res.cookie("token" ,token )
//token create zalya nantr tyala client side vr pathavav lagat tr pathavnya sathi cookie-parser cha used karto. cookie parser kay karto ki je token create kel aahe server ne tya token la set karto client-side vr cookie-storage mdhe.
//yevdhe storage asun cookie-storage madhe ch ka karn 1-server ya access karu shakto bakichya na nahi karu shakt 2-cookie-storage mdhe je pn lihal asel server tyala read pn karu shakto bs hya don karanan mul

// token hya "token" key chya navavr store hoil aani token

res.status(201).json({
    message:"User registred successfully" , 
    user:{
        name: user.name,
        email:user.email
    }
})

})

authRouter.get("/get-me" ,async (req,res)=>{

    const token = req.cookies.token

    
   const decoded = jwt.verify(token , process.env.JWT_SECRET)
    //token ke andar se data nikalne keliye . ye verify karta he ki token hai humare hi server ne create kiya hai nakkali nahi hai

    console.log(decoded) 
    //agar token humara sahi nikala to decoded ke andar usi ke andar usi user ka data hume dekhne keliye milega

    const user = await userModel.findById(decoded.id)
    //jo id hume milegi decoded ke andar usi id ke basis par hum user ko karenge find 

    res.json({
        name:user.name,
        email:user.email
    })
    //aur jo bhi user hume milega use hum response mai send kardenge



})

//Login api - aapla je token aahe te valid hr pn chalel mg nantr expire hoil . mg aaplyala navin token pahije ast mg navin token aaplyala login api trow bhetat

authRouter.post('/login' ,async (req,res)=>{

    const {email , password}=  req.body

    //first check humara jo email hai iske basis par user exits karta hai bhi nahi
    
    const user = await userModel.findOne ({email})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
//db mdhe aapn jo pass save kela aahe to ek hash ahe tr tya hash sobat aapan plane text pass compare nahi karu sakte . tar mg jo pass aaplyakade aala tyala again convert karu hash madhe
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    //hashing ki acchi bat same i/p dene se same o/p harbar milega

    console.log(hash)

    const isPasswordValid = hash === user.password
    if(!isPasswordValid) {
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
        email:user.email
    }, process.env.JWT_SECRET , {expiresIn:"1h"})

    res.cookie("token" ,token )

    res.status(201).json({
    message:"User logged in succefully" , 
    user:{
        name: user.name,
        email:user.email
    }
})


    

})












module.exports = authRouter