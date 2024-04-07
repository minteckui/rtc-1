import { IconButton, Box, Divider, Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopySection = (props) => {
  const { roomId } = props;

  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        color: 'text.primary',
        border: '1px solid',
        borderColor: 'common.white',
        borderRadius: '4px',
        padding: '8px',
        left: '30px',
        bottom: '100px',
      }}
    >
      <Typography variant="body1" sx={{ marginBottom: '4px' }}>
        Copy Room ID:
      </Typography>
      <Divider sx={{ marginBottom: '4px' }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ marginRight: '8px' }}>
          {roomId}
        </Typography>
        <CopyToClipboard text={roomId}>
          <IconButton
            sx={{ color: 'text.primary', cursor: 'pointer' }}
            aria-label="Copy Room ID"
          >
            <FileCopyIcon />
          </IconButton>
        </CopyToClipboard>
      </Box>
    </Box>
  );
};

export default CopySection;
