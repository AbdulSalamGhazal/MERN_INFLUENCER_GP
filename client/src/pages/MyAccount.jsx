import useAuth from "../../context/AuthContext";
import MyAccountInfluencer from "./MyAccountInfluencer";
import MyAccountBusiness from "./MyAccountBusiness"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const MyAccount = () => {
  const { user, loading } = useAuth();

  return (
    <>
      {loading ?
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box> :
        user.type == 'Influencer' ? <MyAccountInfluencer user={user} /> : <MyAccountBusiness user={user} />}
    </>
  )
}

export default MyAccount