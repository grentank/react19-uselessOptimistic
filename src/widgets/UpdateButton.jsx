import { CircularProgress, IconButton } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function UpdateButton({ loading, ...props }) {
  if (loading)
    return (
      <IconButton {...props} disabled>
        <CircularProgress size={24} />
      </IconButton>
    );
  return (
    <IconButton {...props}>
      <BackspaceIcon />
    </IconButton>
  );
}
