import { Box, Stack, TextField } from '@mui/material';
import LoadingButton from './LoadingButton';
import { use, useActionState, useState, useTransition } from 'react';
import PostsContext from '../providers/PostContext';

export default function AddPostForm() {
  const { addPostHandler } = use(PostsContext);

  /**************
   *   DEFAULT  *
   **************/

  const [isPending, setIsPending] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    await addPostHandler(new FormData(e.target)).finally(() => setIsPending(false));
    e.target.reset();
  };

  /*******************
   *  useTransition  *
   *******************/

  //   const [isPending, startTransition] = useTransition();
  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     startTransition(() => addPostHandler(new FormData(e.target)));
  //     e.target.reset();
  //   };

  /********************
   *  useActionState  *
   ********************/

  // const [error, action, isPending] = useActionState(async (_, formData) => {
  //   const err = await addPostHandler(formData);
  //   if (err) {
  //     return err;
  //   }
  //   return null;
  // }, null);
  return (
    <Box
      sx={{
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      {/* <form action={action}> */}
      {/* <form action={addPostHandler}> */}
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField disabled={isPending} name="title" label="Заголовок" variant="outlined" />
          <TextField
            disabled={isPending}
            label="Описание поста"
            name="body"
            multiline
            rows={4}
            variant="outlined"
          />
          <LoadingButton loading={isPending} type="submit" variant="outlined">
            Отправить
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
