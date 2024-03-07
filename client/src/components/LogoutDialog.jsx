import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const LogoutDialog = ({ open, handleClose, handleLogout }) => {

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"تسجيل الخروج"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        هل انت متأكد من  تسجيل الخروج؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>الغاء</Button>
                    <Button onClick={handleLogout} autoFocus>
                        تسجيل الخروج
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default LogoutDialog;