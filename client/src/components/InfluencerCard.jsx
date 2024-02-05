import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function InfluencerCard() {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description
            <p>audiunce, etc....</p>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Select</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default InfluencerCard;
