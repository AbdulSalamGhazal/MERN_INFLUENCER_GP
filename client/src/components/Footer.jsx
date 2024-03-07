import { AppBar, Toolbar, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1">
          تم برمجة الموقع من قبل: عبدالسلام غزال، عبدالقادر برعية، هاني بانبيلة
        </Typography>
        <div>
          <IconButton
            component={Link}
            href="https://https://github.com/AbdulSalamGhazal/MERN_INFLUENCER_GP"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
