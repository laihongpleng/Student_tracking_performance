import mongoose from "mongoose";


const scoreSchema = new mongoose.Schema(
{

    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true,
    },


    assessment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assessment",
        required:true,
    },


    score:{
        type:Number,
        required:true,
        min:0,
    },


    remark:{
        type:String,
        default:"",
    }

},
{
    timestamps:true
});


scoreSchema.index(
{
    student_id:1,
    assessment_id:1,
},
{
    unique:true
});


export default mongoose.model(
    "Score",
    scoreSchema
);