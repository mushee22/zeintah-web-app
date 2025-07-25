# Post Card Components

This directory contains the modularized post card components, organized to avoid prop drilling and improve maintainability.

## Structure

```
post-card/
├── index.ts                 # Main exports
├── types.ts                 # TypeScript interfaces and types
├── utils.ts                 # Shared utility functions
├── post-card.tsx           # Main PostCard component (orchestrator)
├── post-header.tsx         # Post header with user info and actions
├── post-image.tsx          # Post image display component
├── post-body.tsx           # Post content (title, description, timestamp)
├── post-footer.tsx         # Post actions (like, comment, share)
├── post-action.tsx         # Individual action button component
├── post-comment.tsx        # Individual comment component
├── post-comment-list.tsx   # Comment list with input form
├── post-settings-menu.tsx  # Edit/delete menu for post owners
└── post-card-skeleton.tsx  # Loading skeleton component
```

## Usage

### Basic Usage
```tsx
import PostCard from "@/components/elements/post-card";

<PostCard
  id={1}
  title="Post Title"
  description="Post description"
  thumbnail="image-url"
  student={studentData}
  created_date="2024-01-01"
  canEdit={false}
/>
```

### With Skeleton
```tsx
import PostCard, { PostCardSkeleton } from "@/components/elements/post-card";

// Show skeleton while loading
{isLoading ? <PostCardSkeleton /> : <PostCard {...postData} />}
```

### Individual Components
You can also import and use individual components:

```tsx
import { 
  PostHeader, 
  PostImage, 
  PostBody, 
  PostFooter 
} from "@/components/elements/post-card";

// Use components individually
<PostHeader student={student} action={<CustomAction />} />
<PostImage image={thumbnail} alt={title} />
<PostBody title={title} description={description} created_date={date} />
<PostFooter student={student} postId={id} title={title} description={description} />
```

## Props Management

The components are designed to avoid prop drilling by:

1. **Focused Props**: Each component only receives the props it needs
2. **Type Safety**: All props are properly typed with TypeScript interfaces
3. **Shared Types**: Common types are defined in `types.ts`
4. **Utility Functions**: Shared functions are in `utils.ts`

## Key Features

- **Modular Design**: Each component has a single responsibility
- **Type Safety**: Full TypeScript support with proper interfaces
- **Reusable**: Components can be used independently
- **Maintainable**: Easy to modify individual parts without affecting others
- **Performance**: Components are optimized and only re-render when necessary

## Migration from Old Structure

The old monolithic `post-card.tsx` has been replaced with this modular structure. The original file now re-exports from the new structure, so existing imports continue to work without changes. 