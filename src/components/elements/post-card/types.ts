import { Idea, Student } from "@/type";

export interface PostCardProps extends Idea {
  canEdit?: boolean;
}

export interface PostHeaderProps {
  student: Student;
  action?: React.ReactNode;
}

export interface PostImageProps {
  image: string;
  alt: string;
  image_height?: number;
  image_width?: number;
}

export interface PostBodyProps {
  title?: string;
  description?: string;
  created_date: string;
}

export interface PostFooterProps {
  postId: number;
  title?: string;
  description?: string;
  student: Student;
  isUserLiked: boolean;
  likeCount: number;
  commentsCount: number;
}

export interface SocialActionProps {
  icon: React.ReactNode;
  type: "like" | "comment";
  count: number;
  onClick?: () => void;
}

export interface PostCommentListProps {
  open: boolean;
  postId: number;
  currentUserId?: number;
}

export interface PostCommentProps {
  comment: string;
  user: Student;
  isCurrentUserComment?: boolean;
  onDelete?: () => void;
}

export interface PostSettingsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
} 