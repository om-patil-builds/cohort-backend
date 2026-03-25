const express = require ("express")

const authRouter = express.Router()

const authController = require("../controllers/user.controller")




authRouter.post ("/register" , authController.registerController )

authRouter.post("/login" , authController.loginController
 )





module.exports = authRouter




//server pehale check karta hai ki koi user email ke basis pe exits karta hai ya nahi karta hai ya nahi agar karta karta hoga jo bhi res hoga vo return kiya jayega agar nahi karta hoga to hum username ke basis pe check karenge to server vapase query karega on the basis on username aur vapase iska bhi result miljayega
   
//SERVER---->DATABASE     , for username   SERVER---->DATABASE 
//      EMAIL                                    username
//SERVER<----DATABASE                      SERVER<----DATABASE
//       RESULT                                   Result

//Lekin hum iskeliye DB ko dobar call kar rahe hai lekin agar ye process humek hi bar me kare to
   
