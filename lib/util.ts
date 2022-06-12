import { Course, Layout, ScoreCard } from "./types";

export function getNumericId(param: string | string[]): number | null {
  if (param instanceof Array) {
    return null;
  }
  const id = parseInt(param);
  if (isNaN(id)) {
    return null;
  }
  return id;
}

export async function listCourses(): Promise<Array<Course>> {
  const response = await fetch("/api/courses");
  const data = await response.json();
  console.log(data);
  return data.courses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      lat: course.lat,
      lon: course.lon,
      city: course.city,
      state: course.state,
    };
  });
}

export async function getCourse(courseId: number): Promise<Course> {
  const response = await fetch(`/api/courses/${courseId}`);
  const { course } = await response.json();
  console.log(course);
  return {
    id: course.id,
    name: course.name,
    lat: course.lat,
    lon: course.lon,
    city: course.city,
    state: course.state,
  };
}

export async function getLayouts(courseId: number): Promise<Array<Layout>> {
  const response = await fetch(`/api/courses/${courseId}/layouts`);
  const { layouts } = await response.json();
  console.log({ layouts });
  return layouts;
}

export async function getScoreCards(
  userId: number,
  courseId?: number
): Promise<Array<ScoreCard>> {
  const response = await fetch(
    `/api/users/${userId}/scores${courseId ? `?courseId=${courseId}` : ""}`
  );
  const { scoreCards } = await response.json();
  console.log({ scoreCards });
  return scoreCards;
}
