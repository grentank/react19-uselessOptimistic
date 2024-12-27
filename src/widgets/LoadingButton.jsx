import { Button, CircularProgress } from '@mui/material';

export default function LoadingButton({ loading, children, ...props }) {
  if (loading)
    return (
      <Button {...props} disabled>
        <CircularProgress size={24} />
      </Button>
    );
  return <Button {...props}>{children}</Button>;
}
