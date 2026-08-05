import { useEffect, useState } from "react";
import { getSubjectPerformance } from "../services/adminDashboardService";

const useSubjectPerformance = (academicYear) => {

    const [subjectPerformance, setSubjectPerformance] = useState({
        strong: [],
        average: [],
        weak: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchSubjectPerformance = async () => {

            try {

                setLoading(true);

                const data = await getSubjectPerformance(
                    academicYear
                );

                setSubjectPerformance(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        if (academicYear) {

            fetchSubjectPerformance();

        }

    }, [academicYear]);

    return {

        subjectPerformance,
        loading

    };

};

export default useSubjectPerformance;