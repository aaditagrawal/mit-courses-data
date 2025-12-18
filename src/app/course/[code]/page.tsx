import CoursePageClient from '@/components/CoursePageClient';

// For static export: generate a single placeholder route
// Real course data is fetched client-side from /data/course-map.json
// The placeholder page serves as a shell that loads any course dynamically
export function generateStaticParams() {
    return [{ code: '_placeholder' }];
}

export default function CoursePage() {
    return <CoursePageClient />;
}
