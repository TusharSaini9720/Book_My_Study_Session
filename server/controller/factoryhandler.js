

exports.deleteOne=Model=>{
    return async(req,res)=>{
        try{
            
            const doc=await Model.findByIdAndDelete(req.params.id);
            //console.log("doc",doc);
            res.status(200).json({
                status:'success',
                doc
            })
        }catch(err){
            res.status(400).json({
                status:'failed',
                message:err
            })
        }
    }
}
