import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true,
    },

    type:{
        type:String,
        enum:[
            "Quiz",
            "Assignment",
            "Project",
            "Midterm",
            "Final",
            "Other"
        ],
        required:true,
    },

    max_score:{
        type:Number,
        required:true,
        min:1,
    },

    weight:{
        type:Number,
        required:true,
        min:0.01,
        max:100,
    },

    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true,
    },

    subject_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true,
    },

    teacher_assignment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TeacherAssignment",
        required:true,
    },

    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required:true,
    },

    semester:{
        type:String,
        enum:[
            "Semester 1",
            "Semester 2"
        ],
        required:true,
    },

    assessment_date: {
        type: Date,
        required: true
    }
},
{
    timestamps:true
});


export default mongoose.model(
    "Assessment",
    assessmentSchema
);