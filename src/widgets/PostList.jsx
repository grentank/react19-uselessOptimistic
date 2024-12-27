import { use } from 'react';
import { Stack } from '@mui/material';
import PostCard from './PostCard';
import PostCardOptimistic from './PostCardOptimistic';
import PostsContext from '../providers/PostContext';

export default function PostList() {
  const { posts } = use(PostsContext);
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        // <PostCard post={post} key={post.id} />
        <PostCardOptimistic optimistic={post.optimistic} post={post} key={post.id} />
      ))}
    </Stack>
  );
}
