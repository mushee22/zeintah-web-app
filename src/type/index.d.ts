export type Response<T> = {
  message: string;
  resp_code: number;
  data?: T;
  meta?: Meta;
};

export type Meta = {
  count: number;
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  next?: string;
  page_size: number;
  previous?: string;
  total_pages?: number;
};

export type CourseProgress = {
  total_subchapters: number;
  completed_subchapters: number;
  last_watched_sub_chapter?: SubChapter;
};

export type Progress = {
  id: number;
  created_date: string;
  created_time: string;
  modified_date: string;
  modified_time: string;
  is_active: boolean;
  is_completed: boolean;
  watched_duration: number;
  last_watched_at: string;
  student: number;
  sub_chapter: number;
};

export type Chapter = {
  id: number;
  total_subchapters: number;
  completed_subchapters: number;
  total_duration: number;
  created_date: string;
  created_time: string;
  modified_date: string;
  modified_time: string;
  is_active: boolean;
  title: string;
  thumbnail: string;
  description: string;
  duration: number;
  order: number;
  package: Course;
  package_title?: string;
  subchapters: SubChapter[];
};

export type SubChapter = {
  id: number;
  chapter_name: string;
  is_completed: boolean;
  created_date: string;
  created_time: string;
  modified_date: string;
  modified_time: string;
  is_active: boolean;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  duration: number;
  order: number;
  chapter: number;
  progress: Progress | null;
  video_url: string;
};

export interface Student {
  id: number;
  // purchases: any[]
  user: User;
  created_date: string;
  created_time: string;
  modified_date: string;
  modified_time: string;
  is_active: boolean;
  group_code?: string;
  profile_image?: string;
  student_bio?: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface Idea {
  id: number;
  student: Student;
  created_date: string;
  created_time: string;
  title: string;
  thumbnail: string;
  description: string;
  width: number;
  height: number;
  is_liked: boolean;
  like_count: number;
  comment_count: number;
}


export type Comment = {
  id: number;
  student: Student;
  created_date: string;
  created_time: string;
  modified_date: string;
  modified_time: string;
  idea: Idea;
  comment: string;
}

export type Course = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  created_date: string;
  created_time: string;
  modified_date: string;
  modified_time: string;
  is_student_purchased: boolean;
}