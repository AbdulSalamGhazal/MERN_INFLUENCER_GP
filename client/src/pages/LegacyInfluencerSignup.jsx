import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import PersonalInfoForm from "../components/signup/PersonalInfoForm";
import PlatformsForm from "../components/signup/PlatformsForm";
import AudienceInfoForm from "../components/signup/AudienceInfoForm";
import SpecialRequirementsForm from "../components/signup/SpecialRequirementsForm";
import axios from "axios";
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const InfluencerSignup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState(null);
  const stepperRef = useRef(null);
  const titleRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [presonalInterests, setPersonalInterests] = useState("");

  const [flowersLocations, setFollowersLocations] = useState([]);
  const [totalFollowers, setTotalFollowers] = useState([]);
  const [audienceAge, setAudienceAge] = useState([10, 30]);
  const [audienceGender, setAudienceGender] = useState(50);
  const [likesNumber, setLikesNumber] = useState();
  const [commentsNumber, setCommentsNumber] = useState();
  const [audienceInterests, setAudienceInterests] = useState([]);

  const [platforms, setPlatforms] = useState([{ name: "", url: "" }]);

  const [avgCost, setAvgCost] = useState();
  const [requirements, setRequirements] = useState([""]);

  useEffect(() => {
    const targetTop = titleRef.current?.offsetTop || 0; // Handle potential undefined ref
    const windowBottom = window.scrollY + window.innerHeight;
    console.log(windowBottom)
  
    // Scroll only if window is below the target component
    if (windowBottom > targetTop) {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }, [activeStep]); // Re-run on step change or target ID change
  

  const steps = [
    "presonal info",
    "audience info",
    "platforms",
    "special requirements",
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoForm
            name={name}
            setName={setName}
            gender={gender}
            setGender={setGender}
            email={email}
            setEmail={setEmail}
            location={location}
            setLocation={setLocation}
            image={image}
            setImage={setImage}
            field={field}
            setField={setField}
            description={description}
            setDescription={setDescription}
            interests={presonalInterests}
            setInterests={setPersonalInterests}
            password={password}
            setPassword={setPassword}
          />
        );

      case 1:
        return (
          <AudienceInfoForm
            totalFollowers={totalFollowers}
            setTotalFollowers={setTotalFollowers}
            flowersLocations={flowersLocations}
            setFollowersLocations={setFollowersLocations}
            age={audienceAge}
            setAge={setAudienceAge}
            genderPercent={audienceGender}
            setGenderPrecent={setAudienceGender}
            likes={likesNumber}
            setLikes={setLikesNumber}
            comments={commentsNumber}
            setComments={setCommentsNumber}
            interests={audienceInterests}
            setInterests={setAudienceInterests}
          />
        );

      case 2:
        return (
          <PlatformsForm
            platforms={platforms}
            setPlatforms={setPlatforms}
            avgCost={avgCost}
            setAvgCost={setAvgCost}
          />
        );

      case 3:
        return (
          <SpecialRequirementsForm
            requirements={requirements}
            setRequirements={setRequirements}
          />
        );

      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    const influencer = {
      name,
      email,
      location,
      image,
      description,
      platforms: platforms.map((p) => p.name),
      field,
      password,
      avg_cost: avgCost,
      special_requriements: requirements,
      personal_interests: presonalInterests,
      total_followers: totalFollowers,
      audience_location: flowersLocations,
      audience_age_rang: `${audienceAge[0]}-${audienceAge[1]}`,
      audience_gender: audienceGender,
      audience_interests: audienceInterests,
      avg_likes: likesNumber,
      avg_comments: commentsNumber,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3001/influencers",
        influencer,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      login(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorAlert(error.message);
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  return (
    <Box>
      {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
      <Typography
        component="h1"
        variant="h3"
        align="center"
        ref={titleRef}
        sx={{ mt: "5px", mb: "30px" }}
      >
        Influencer Sign Up
      </Typography>

      <Box>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          ref={stepperRef}
          sx={{maxWidth: '700px', mx: 'auto', my: 2}}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              noValidate
              sx={{ mt: 3, maxWidth: '500px', margin: 'auto'}}
            >
              {getStepContent(activeStep)}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, maxWidth: '500px', margin: 'auto' }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              {activeStep === steps.length - 1 ? (
                <Button onClick={handleSubmit} variant="contained">Sumbit</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default InfluencerSignup;
