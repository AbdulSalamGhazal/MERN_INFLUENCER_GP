import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Signup = () => {
  return (
    <Grid container spacing={10} alignItems="center" justifyContent="space-evenly">
        <Grid xs={12}>
            <Typography component="h1" variant="h2" align="center">
                Sign Up as
            </Typography>
        </Grid>
        <Grid>
            <Button href="/signup/influencer" size="large" variant="contained" sx={{padding: '30px 40px', fontSize: '1.5rem', fontWeight: 'bold'}}>Influencer</Button>
        </Grid>
        <Grid >
            <Button href="/signup/business" size="large" variant="contained" sx={{padding: '30px 40px', fontSize: '1.5rem', fontWeight: 'bold'}}>Business</Button>
        </Grid>
        <Grid container xs={12} justifyContent={'center'}>
            <Grid>
            <Link href="/login" variant="body2" align="center">
              {"Do you already have an account? Log In"}
            </Link>
            </Grid>
          </Grid>
    </Grid>
  )
}

export default Signup