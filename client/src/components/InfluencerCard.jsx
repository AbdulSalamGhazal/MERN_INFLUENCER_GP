import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function InfluencerCard({ influencer }) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="300"
          image={influencer.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {influencer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {influencer.desc}
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
