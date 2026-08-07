const SubjectCard = ({
    subjects
}) => {


    return (

        <div className="
            bg-white
            rounded-xl
            shadow-sm
            p-6
        ">


            <h2 className="
                font-semibold
                mb-4
            ">
                Subjects Teaching
            </h2>


            <div className="space-y-2">


            {
                subjects.map(subject=>(

                    <div
                        key={subject.subject_id}
                        className="
                            px-4
                            py-3
                            bg-blue-50
                            rounded-lg
                            text-blue-700
                        "
                    >
                        {subject.subject_name}
                    </div>

                ))
            }


            </div>


        </div>

    );

};


export default SubjectCard;