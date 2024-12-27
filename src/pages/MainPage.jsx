import { Container, Grid2 } from '@mui/material';
import AddPostForm from '../widgets/AddPostForm';
import PostList from '../widgets/PostList';

export default function MainPage() {
  return (
    <Container
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Grid2
        sx={{
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
        container
      >
        <Grid2 size={3}>
          <AddPostForm />
        </Grid2>
        <Grid2 size={6}>
          <PostList />
        </Grid2>
      </Grid2>
    </Container>
  );
}
