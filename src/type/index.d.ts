export type Response<T> = {
    message: string,
    resp_code: number,
    data?: T
}


export type CourseProgress = {
    total_subchapters: number,
    completed_subchapters: number,
    last_watched_sub_chapter?: SubChapter
}

export type Progress = {
    id: number
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    is_completed: boolean
    watched_duration: number
    last_watched_at: string
    student: number
    sub_chapter: number
}

export type Chapter = {
    id: number
    total_subchapters: number
    completed_subchapters: number
    total_duration: number
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    title: string
    thumbnail: string
    description: string
    duration: number
    order: number
    subchapters: SubChapter[]
}

export type SubChapter = {
    id: number
    chapter_name: string
    is_completed: boolean
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    title: string
    description: string
    video: string
    thumbnail: string
    duration: number
    order: number
    chapter: number,
    progress: Progress | null
}

export interface Student {
    id: number
    // purchases: any[]
    user: User
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    group_code?: string
    profile_image?: string
    student_bio?: string
}

export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
}