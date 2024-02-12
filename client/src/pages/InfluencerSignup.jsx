import { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import PersonalInfoForm from '../components/signup/PersonalInfoForm'
import PlatformsForm from '../components/signup/PlatformsForm';
import AudienceInfoForm from '../components/signup/AudienceInfoForm';
import SpecialRequirementsForm from '../components/signup/SpecialRequirementsForm';
import axios from "axios";



const InfluencerSignup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [field, setField] = useState('');
  const [description, setDescription] = useState('');
  const [presonalInterests, setPersonalInterests] = useState('');

  const [flowersLocations, setFollowersLocations] = useState([]);
  const [totalFollowers, setTotalFollowers] = useState([]);
  const [audienceAge, setAudienceAge] = useState([19, 30]);
  const [audienceGender, setAudienceGender] = useState(50);
  const [likesNumber, setLikesNumber] = useState(0);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [audienceInterests, setAudienceInterests] = useState([]);

  const [platforms, setPlatforms] = useState([{name: '', url: ''}]);

  const [avgCost, setAvgCost] = useState(0);
  const [requirements, setRequirements] = useState(['']);

  const steps = ['presonal info', 'audience info', 'platforms', 'special requirements'];

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <PersonalInfoForm
          name={name} setName={setName}
          gender={gender} setGender={setGender}
          email={email} setEmail={setEmail}
          location={location} setLocation={setLocation}
          image={image} setImage={setImage}
          field={field} setField={setField}
          description={description} setDescription={setDescription}
          interests={presonalInterests} setInterests={setPersonalInterests}
          password={password} setPassword={setPassword}
        />;

      case 1:
        return <AudienceInfoForm
          totalFollowers={totalFollowers} setTotalFollowers={setTotalFollowers}
          flowersLocations={flowersLocations} setFollowersLocations={setFollowersLocations}
          age={audienceAge} setAge={setAudienceAge}
          genderPercent={audienceGender} setGenderPrecent={setAudienceGender}
          likes={likesNumber} setLikes={setLikesNumber}
          comments={commentsNumber} setComments={setCommentsNumber}
          interests={audienceInterests} setInterests={setAudienceInterests} />

      case 2:
        return <PlatformsForm platforms={platforms} setPlatforms={setPlatforms}
        avgCost={avgCost} setAvgCost={setAvgCost}/>

      case 3:
        return <SpecialRequirementsForm 
          requirements={requirements} setRequirements={setRequirements} />

      default:
        throw new Error('Unknown step');
    }
  }

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
      platforms: platforms.map(p => p.name),
      field,
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
    }
    try {
      await axios.post("http://localhost:3001/influencers", influencer);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" align="center">
          Influencer Sign Up
        </Typography>

        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => {
              return (
                <Step key={label} >
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
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Box
                component="form" 
                onSubmit={e => e.preventDefault()} 
                noValidate
                sx={{ mt: 3 }}
              >
                {getStepContent(activeStep)}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {activeStep === steps.length - 1 ? 
                  <Button onClick={handleSubmit}>
                    Sumbit
                  </Button> : 
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                }
              </Box>
            </>
          )}
        </Box>
      </Box>

    </Container>
  );
}

export default InfluencerSignup;