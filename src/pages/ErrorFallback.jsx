import { Button, Container, Stack, Typography } from '@mui/material';

export default function ErrorFallback() {
  return (
    <Container>
      <Stack>
        <Typography variant="h1">Ошибка при выполнении программы</Typography>
        <Typography variant="h4">Перезагрузите страницу</Typography>
        <Button onClick={() => window.location.reload()}>Перезагрузка</Button>
      </Stack>
    </Container>
  );
}
