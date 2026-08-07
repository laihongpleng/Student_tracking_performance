import Attendance from "../models/Attendance.js";
import Teacher from "../models/Teacher.js";
import TeacherAssignment from "../models/TeacherAssignment.js";
import Student from "../models/Student.js";
import User from "../models/User.js";
import Class from "../models/Class.js";

export const markAttendance = async (userId, data) => {

  const session = await Attendance.startSession();

  try {

    session.startTransaction();

    const {
      teacher_assignment_id,
      attendance_date,
      attendance,
    } = data;

    const teacher = await Teacher.findOne({
      user_id: userId
    }).session(session);

    if (!teacher) {
      throw new Error("Teacher not found.");
    }

    const assignment = await TeacherAssignment.findById(
      teacher_assignment_id
    ).session(session);

    if (!assignment) {
      throw new Error(
        "Teacher assignment not found."
      );
    }

    if (
      assignment.teacher_id.toString() !==
      teacher._id.toString()
    ) {
      throw new Error(
        "You are not assigned to this class."
      );
    }

    if (!attendance || attendance.length === 0) {
      throw new Error(
        "Attendance list is empty."
      );
    }
    const classData = await Class.findById(
    assignment.class_id
    );

    if(!classData){
    throw new Error("Class not found");
    }

    const attendanceRecords = [];

    for (const item of attendance) {

      const student = await Student.findById(
        item.student_id
      ).session(session);

      if (!student) {
        throw new Error(
          "Student not found."
        );
      }

      if (
        !student.class_id ||
        student.class_id.toString() !==
        assignment.class_id.toString()
      ) {
        throw new Error(
          `${student.full_name} does not belong to this class.`
        );
      }

      const exist = await Attendance.findOne({
        student_id: student._id,
        subject_id: assignment.subject_id,
        attendance_date,
      }).session(session);

      if (exist) {
        throw new Error(
          `${student.full_name} attendance already exists.`
        );
      }

      const validStatus = [
        "Present",
        "Absent",
        "Late",
        "Excused",
      ];

      if (!validStatus.includes(item.status)) {
        throw new Error(
          `Invalid attendance status for ${student.full_name}.`
        );
      }

      attendanceRecords.push({
        student_id: student._id,
        teacher_assignment_id: assignment._id,
        teacher_id: teacher._id,
        class_id: assignment.class_id,
        subject_id: assignment.subject_id,
        academic_year: classData.academic_year,
        attendance_date,
        status: item.status,
        remark: item.remark || "",
      });
    }

    const result = await Attendance.insertMany(
      attendanceRecords,
      {
        session
      }
    );

    await session.commitTransaction();

    return result;

  } catch(error) {

    await session.abortTransaction();

    throw error;

  } finally {

    session.endSession();

  }

};

export const updateAttendance = async (
    userId,
    attendanceId,
    data
) => {

    const teacher = await Teacher.findOne({
        user_id: userId,
    });

    if (!teacher) {
        throw new Error("Teacher not found.");
    }

    const attendance =
        await Attendance.findById(attendanceId);

    if (!attendance) {
        throw new Error(
            "Attendance record not found."
        );
    }

    if (
        attendance.teacher_id.toString() !==
        teacher._id.toString()
    ) {
        throw new Error(
            "You cannot edit this attendance."
        );
    }

    if (data.status) {

        const validStatus = [
            "Present",
            "Absent",
            "Late",
            "Excused",
        ];

        if (
            !validStatus.includes(data.status)
        ) {
            throw new Error(
                "Invalid attendance status."
            );
        }

        attendance.status = data.status;
    }

    if (data.remark !== undefined) {
        attendance.remark = data.remark;
    }

    await attendance.save();

    return attendance;
};

export const getAttendanceByClass = async ( userId, classId ) => {
    const user = await User.findById(
        userId
    );

    if (!user) {
        throw new Error(
            "User not found."
        );
    }

    if (user.role === "teacher") {
        const teacher = await Teacher.findOne({
            user_id: userId,
        });

        if (!teacher) {
            throw new Error(
                "Teacher not found."
            );
      }
      
        const assignment =
            await TeacherAssignment.findOne({
                teacher_id: teacher._id,
                class_id: classId,
            });

        if (!assignment) {
            throw new Error(
                "You are not assigned to this class."
            );
        }

    }

    const attendance =
        await Attendance.find({
            class_id: classId,
        })
        .populate(
          "class_id", 
          "class_name academic_year"
        )
        .populate(
            "student_id",
            "full_name"
        )
        .populate(
            "teacher_id",
            "full_name"
        )
        .populate(
            "subject_id",
            "subject_name"
        )
        .sort({
            attendance_date: -1,
        });

  return attendance;
  
};

export const getAttendanceByStudent = async (userId, studentId) => {
    const user = await User.findById(
        userId
    );

    if (!user) {
        throw new Error(
            "User not found."
        );
    }
    const student =
    await Student.findById(
            studentId
    );
  
    if(!student){
        throw new Error(
            "Student not found."
        );

    }

    
    if(user.role === "teacher"){


        const teacher =
            await Teacher.findOne({
                user_id:userId
            });



        const assignment =
            await TeacherAssignment.findOne({

                teacher_id:
                    teacher._id,

                class_id:
                    student.class_id

            });

        if(!assignment){

            throw new Error(
                "You cannot view this student attendance."
            );

        }

    }

    return await Attendance.find({

        student_id:studentId

    })

    .populate(
        "subject_id",
        "subject_name"
    )

    .populate(
        "teacher_id",
        "full_name"
    )

    .populate(
        "class_id",
        "class_name academic_year"
    )

    .sort({
        attendance_date:-1
    });


};

export const getStudentAttendanceSummary = async (
    studentId
) => {

    const attendance = await Attendance.find({
        student_id: studentId,
    })
    .populate(
        "subject_id",
        "subject_name"
    )
    .sort({
        attendance_date: 1,
    });


    const summary = {

        totalRecords: attendance.length,

        present: 0,

        absent: 0,

        late: 0,

        excused: 0,

        attendanceRate: 0,

        subjectSummary: {},

    };


    attendance.forEach((record)=>{


        switch(record.status){

            case "Present":
                summary.present++;
                break;


            case "Absent":
                summary.absent++;
                break;


            case "Late":
                summary.late++;
                break;


            case "Excused":
                summary.excused++;
                break;

        }



        const subjectName =
            record.subject_id.subject_name;



        if(!summary.subjectSummary[subjectName]){

            summary.subjectSummary[subjectName] = {

                total:0,

                present:0,

                absent:0,

                late:0,

                excused:0,

            };

        }



        summary.subjectSummary[subjectName].total++;


        switch(record.status){

            case "Present":

                summary.subjectSummary[subjectName].present++;

                break;


            case "Absent":

                summary.subjectSummary[subjectName].absent++;

                break;


            case "Late":

                summary.subjectSummary[subjectName].late++;

                break;


            case "Excused":

                summary.subjectSummary[subjectName].excused++;

                break;

        }


    });



    if(summary.totalRecords > 0){

        summary.attendanceRate = Number(
            (
                (
                    (summary.present +
                    summary.late +
                    summary.excused)
                    /
                    summary.totalRecords
                )
                *
                100
            ).toFixed(2)
        );

    }



    return summary;

};

export const getAttendanceSummaryByClass = async (
  classId,
  startDate,
  endDate
) => {
  const filter = {
    class_id: classId,
  };

if (startDate && endDate) {

    filter.attendance_date = {

        $gte: new Date(`${startDate}T00:00:00.000Z`),

        $lte: new Date(`${endDate}T23:59:59.999Z`)

    };

}

  const attendance = await Attendance.find(filter)
    .populate("student_id", "full_name")
    .populate("subject_id", "subject_name")
    .sort({ attendance_date: 1 });

  const summary = {
    totalRecords: attendance.length,
    present: 0,
    absent: 0,
    late: 0,
    excused: 0,
    attendanceRate: 0,
    dailySummary: {},
  };

  attendance.forEach((record) => {
    switch (record.status) {
      case "Present":
        summary.present++;
        break;

      case "Absent":
        summary.absent++;
        break;

      case "Late":
        summary.late++;
        break;

      case "Excused":
        summary.excused++;
        break;
    }

    const date = record.attendance_date
      .toISOString()
      .split("T")[0];

    if (!summary.dailySummary[date]) {
      summary.dailySummary[date] = {
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
      };
    }

    switch (record.status) {
      case "Present":
        summary.dailySummary[date].present++;
        break;

      case "Absent":
        summary.dailySummary[date].absent++;
        break;

      case "Late":
        summary.dailySummary[date].late++;
        break;

      case "Excused":
        summary.dailySummary[date].excused++;
        break;
    }
  });

  if (summary.totalRecords > 0) {
    summary.attendanceRate = Number(
      (
        ((summary.present +
          summary.late +
          summary.excused) /
          summary.totalRecords) *
        100
      ).toFixed(2)
    );
  }

  return summary;
};

export const getAttendanceByClassAndDate = async (
    classId,
    subjectId,
    date
) => {

    const attendance = await Attendance.find({
      class_id: classId,
      subject_id: subjectId,
        attendance_date: {
            $gte: new Date(`${date}T00:00:00.000Z`),
            $lte: new Date(`${date}T23:59:59.999Z`)
        }
    })

    .populate(
        "student_id",
        "full_name"
    )

    .populate(
        "subject_id",
        "subject_name"
    )

    .populate(
        "teacher_id",
        "full_name"
    )
      
    .populate(
        "class_id",
        "class_name"
    )

    .sort({
        subject_id:1,
        student_id:1
    });


    return attendance;

};

export const getTeacherAttendanceOverview = async (
    userId,
    classId
)=>{


    const teacher =
        await Teacher.findOne({
            user_id:userId
        });


    if(!teacher){
        throw new Error(
            "Teacher not found"
        );
    }



    const assignment =
        await TeacherAssignment.findOne({

            teacher_id:teacher._id,

            class_id:classId,

            isActive:true

        });



    if(!assignment){

        throw new Error(
            "You are not assigned to this class"
        );

    }



    const totalStudents =
        await Student.countDocuments({
            class_id:classId
        });



    const today = new Date();

const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999);


const attendance =
    await Attendance.find({

        class_id: classId,

        attendance_date: {
            $gte: startOfDay,
            $lte: endOfDay
        }

    });



    const overview = {

        totalStudents,

        present:0,

        absent:0,

        late:0,

        excused:0

    };



    attendance.forEach(item=>{


        switch(item.status){

            case "Present":
                overview.present++;
                break;


            case "Absent":
                overview.absent++;
                break;


            case "Late":
                overview.late++;
                break;


            case "Excused":
                overview.excused++;
                break;

        }


    });



    return overview;


};
