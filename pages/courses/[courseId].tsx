import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import Layout from "../../components/Layout";
import { getCourse, getLayouts, getScoreCards } from "../../lib/util";
import { Course, ScoreCard, Layout as CourseLayout } from "../../lib/types";

export default function CoursePage() {
  const router = useRouter();
  const { courseId: courseIdQuery } = router.query;
  const [course, setCourse] = useState<Course>();
  const [layouts, setLayouts] = useState<Array<CourseLayout>>();
  const [scoreCards, setScoreCards] = useState<Array<ScoreCard>>();

  //TODO: Store real user ID
  const userId = 1;

  useEffect(() => {
    if (!courseIdQuery || isNaN(parseInt(courseIdQuery.toString()))) {
      return;
    }
    const courseId = parseInt(courseIdQuery.toString());
    getCourse(courseId)
      .then((c) => setCourse(c))
      .catch((err) => {
        console.error(err);
      });

    getLayouts(courseId)
      .then((layouts) => setLayouts(layouts))
      .catch((err) => {
        console.error(err);
      });

    getScoreCards(userId, courseId)
      .then((scoreCards) => setScoreCards(scoreCards))
      .catch((err) => {
        console.error(err);
      });
  }, [courseIdQuery]);

  return (
    course && (
      <Layout>
        <CourseCard course={course} layouts={layouts} scores={scoreCards} />
      </Layout>
    )
  );
}
