import { Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material';
import LoadingButton from './LoadingButton';
import { use, useState, useTransition } from 'react';
import UpdateButton from './UpdateButton';
import PostsContext from '../providers/PostContext';

export default function PostCardOptimistic({ post, optimistic }) {
  const { deletePostHandler, updatePostHandler } = use(PostsContext);
  /***********
   * DEFAULT *
   ***********/
  const [isPending, setIsPending] = useState(false);
  const onClick = async () => {
    setIsPending(true);
    await deletePostHandler(post.id).finally(() => setIsPending(false));
  };

  /*****************
   * useTransition *
   *****************/
  // const [isPending, startTransition] = useTransition();
  // const onClick = () => {
  //   startTransition(() => deletePostHandler(post.id));
  // };
  return (
    <Card
      sx={{
        maxWidth: 345,
        color: optimistic ? '#0f0f0f' : undefined,
        backgroundColor: optimistic ? '#f0f0f0' : undefined,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title} {optimistic && <CircularProgress size={10} />}
          <UpdateButton
            onClick={() => updatePostHandler(post.id, { ...post, title: post.title.slice(0, -5) })}
          />
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={isPending} onClick={onClick} disabled={optimistic} size="small">
          Удалить
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
