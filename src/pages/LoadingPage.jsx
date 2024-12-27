import { Box, CircularProgress } from '@mui/material';

export default function LoadingPage() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
}
