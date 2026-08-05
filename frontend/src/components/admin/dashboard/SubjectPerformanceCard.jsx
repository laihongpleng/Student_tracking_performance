import {
    TrendingUp,
    MinusCircle,
    TrendingDown
} from "lucide-react";


const SubjectPerformanceCard = ({
    title,
    subjects = [],
    type
}) => {


    const styles = {

        strong: {
            card: "bg-green-50 border-green-100",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            bar: "bg-green-500",
            icon: <TrendingUp size={16} />
        },


        average: {
            card: "bg-yellow-50 border-yellow-100",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
            bar: "bg-yellow-500",
            icon: <MinusCircle size={16} />
        },


        weak: {
            card: "bg-red-50 border-red-100",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            bar: "bg-red-500",
            icon: <TrendingDown size={16} />
        }

    };


    return (

        <div
            className={`
                rounded-2xl
                border
                shadow-sm
                p-5
                ${styles[type].card}
            `}
        >


            {/* Header */}

            <div className="flex items-center gap-3 mb-5">


                <div
                    className={`
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${styles[type].iconBg}
                        ${styles[type].iconColor}
                    `}
                >

                    {styles[type].icon}

                </div>


                <h3 className="text-base font-semibold text-gray-800">

                    {title}

                </h3>


            </div>



            {/* Subjects */}

            {
                subjects.length === 0 ? (

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            h-40
                        "
                    >

                        <p className="text-sm text-gray-500">

                            No subject performance data available.

                        </p>


                    </div>


                ) : (


                    <div className="space-y-4">


                        {
                            subjects.map(
                                (item, index) => (

                                    <div
                                        key={item.name}
                                    >


                                        <div
                                            className="
                                                flex
                                                justify-between
                                                items-center
                                                mb-2
                                            "
                                        >


                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                "
                                            >


                                                <span
                                                    className="
                                                        w-6
                                                        h-6
                                                        rounded-full
                                                        bg-white
                                                        border
                                                        border-gray-200
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-xs
                                                        font-semibold
                                                        text-gray-600
                                                    "
                                                >

                                                    {index + 1}

                                                </span>



                                                <span
                                                    className="
                                                        text-sm
                                                        text-gray-700
                                                    "
                                                >

                                                    {item.name}

                                                </span>


                                            </div>



                                            <span
                                                className="
                                                    text-sm
                                                    font-semibold
                                                    text-gray-800
                                                "
                                            >

                                                {item.score}%

                                            </span>


                                        </div>




                                        <div
                                            className="
                                                w-full
                                                h-2
                                                bg-white
                                                rounded-full
                                                overflow-hidden
                                            "
                                        >


                                            <div

                                                className={`
                                                    h-full
                                                    rounded-full
                                                    ${styles[type].bar}
                                                `}


                                                style={{
                                                    width:
                                                    `${item.score}%`
                                                }}

                                            />


                                        </div>


                                    </div>

                                )
                            )
                        }


                    </div>


                )
            }


        </div>

    );


};


export default SubjectPerformanceCard;