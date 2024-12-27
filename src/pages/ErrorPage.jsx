import { Button, Container, Stack, Typography } from '@mui/material';

export default function ErrorPage() {
  return (
    <Container>
      <Stack>
        <Typography variant="h1">Ошибка роутинга</Typography>
        <Typography variant="h4">Вернитесь на главную</Typography>
        <Button onClick={() => (window.location.href = '/')}>Назад</Button>
      </Stack>
    </Container>
  );
}
