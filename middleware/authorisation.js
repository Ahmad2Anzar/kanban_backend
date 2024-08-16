const authorisation=(permittedRoles)=>{
    return (req,res,next)=>{
        const userRole=req.user.userRole
        if(permittedRoles.includes(userRole)){
            next()
        }
        else{
            res.send("u r not allowed to access this route")
        }
    }
}

export default authorisation