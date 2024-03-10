import { Dialog, Avatar, Typography, Divider, Box } from '@mui/material';


function ProfileDialog({ user, open, setOpen }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <Box sx={{ width: 270, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <Avatar src={user.image} variant="rounded" sx={{ width: '100%', height: 'auto' }} />
          <Typography variant='h5' align='center' sx={{mt: 2}}>
            {user.name}
          </Typography>
          <Typography variant='h5' align='center' sx={{mb: 1}}>
            {user.email}
          </Typography>
          <Divider variant="middle" />
          <Typography variant='body' align='center' color="text.secondary" >
            {user.description}
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
}

export default ProfileDialog;
