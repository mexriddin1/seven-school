import bcrypt from 'bcryptjs';
import { pool, query, tx } from './pool.js';
import { env } from '../config/env.js';
import { seedSettings } from './seed-data/settings.js';
import { seedTeachers } from './seed-data/teachers.js';
import { seedTopStudents } from './seed-data/top-students.js';
import { seedAlumni } from './seed-data/alumni.js';
import { seedExamResults } from './seed-data/exam-results.js';
import { seedAwards } from './seed-data/awards.js';
import { seedUniversities } from './seed-data/universities.js';
import { seedBlogPosts } from './seed-data/blog-posts.js';
import { seedExamCourses } from './seed-data/exam-courses.js';
import { seedLessonSubjects } from './seed-data/lesson-subjects.js';
import { seedLessonExtras } from './seed-data/lesson-extras.js';
import { seedGallery } from './seed-data/gallery.js';
import { seedFaqs } from './seed-data/faqs.js';
import { seedTestimonialVideos } from './seed-data/testimonial-videos.js';
import { seedMedia } from './seed-data/media.js';
import { seedCarousel } from './seed-data/carousel.js';
import { seedExamCourseSections } from './seed-data/exam-course-sections.js';
import { seedAdvantages } from './seed-data/advantages.js';
import { seedPricingPlans } from './seed-data/pricing-plans.js';
import { seedAboutStats } from './seed-data/about-stats.js';
import { seedEcoStages } from './seed-data/eco-stages.js';
import { seedKidsFeatures } from './seed-data/kids-features.js';
import { seedTogaraks } from './seed-data/togaraks.js';
import { seedCurriculumItems } from './seed-data/curriculum-items.js';
import { seedIndividualStats } from './seed-data/individual-stats.js';
import { seedScheduleItems } from './seed-data/schedule-items.js';
import { seedLessonBlocks } from './seed-data/lesson-blocks.js';

async function clearTables() {
  console.log('[seed] clearing data...');
  const tables = [
    'application_submissions',
    'lesson_block_translations', 'lesson_blocks',
    'schedule_item_translations', 'schedule_items',
    'individual_stat_translations', 'individual_stats',
    'curriculum_item_translations', 'curriculum_items',
    'togarak_translations', 'togaraks',
    'kids_feature_translations', 'kids_features',
    'eco_stage_translations', 'eco_stages',
    'exam_course_section_translations', 'exam_course_sections',
    'advantage_translations', 'advantages',
    'pricing_plan_translations', 'pricing_plans',
    'about_stat_translations', 'about_stats',
    'carousel_images',
    'faq_translations', 'faqs',
    'gallery_translations', 'gallery_items',
    'lesson_extra_translations', 'lesson_extras',
    'lesson_subject_translations', 'lesson_subjects',
    'exam_course_translations', 'exam_courses',
    'blog_post_translations', 'blog_posts',
    'university_translations', 'universities',
    'award_translations', 'awards',
    'exam_result_translations', 'exam_results',
    'alumni_translations', 'alumni',
    'top_student_translations', 'top_students',
    'testimonial_videos',
    'teacher_translations', 'teachers',
    'settings',
    'media',
    'users',
  ];
  await query('SET FOREIGN_KEY_CHECKS = 0');
  for (const t of tables) {
    await query(`TRUNCATE TABLE \`${t}\``);
  }
  await query('SET FOREIGN_KEY_CHECKS = 1');
}

async function seedAdmin() {
  console.log('[seed] creating default admin...');
  const hash = await bcrypt.hash(env.seed.adminPassword, 10);
  await query(
    `INSERT INTO users (email, password_hash, name, role, is_active)
     VALUES (?, ?, ?, 'superadmin', 1)`,
    [env.seed.adminEmail, hash, env.seed.adminName],
  );
  console.log(`[seed]   admin: ${env.seed.adminEmail} / ${env.seed.adminPassword}`);
}

async function run() {
  console.log('[seed] starting...');
  await clearTables();
  await seedAdmin();
  const mediaMap = await seedMedia();
  await seedSettings();
  await seedTeachers(mediaMap);
  await seedTestimonialVideos(mediaMap);
  await seedTopStudents(mediaMap);
  await seedAlumni(mediaMap);
  await seedExamResults(mediaMap);
  await seedAwards(mediaMap);
  await seedUniversities(mediaMap);
  await seedBlogPosts(mediaMap);
  await seedExamCourses();
  await seedExamCourseSections(mediaMap);
  await seedLessonSubjects();
  await seedLessonExtras(mediaMap);
  await seedGallery(mediaMap);
  await seedFaqs();
  await seedCarousel(mediaMap);
  await seedAdvantages();
  await seedPricingPlans();
  await seedAboutStats();
  await seedEcoStages();
  await seedKidsFeatures();
  await seedTogaraks();
  await seedCurriculumItems();
  await seedIndividualStats();
  await seedScheduleItems();
  await seedLessonBlocks();
  console.log('[seed] done');
  await pool.end();
}

run().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
