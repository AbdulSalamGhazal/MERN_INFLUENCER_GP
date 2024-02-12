import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel'
import Slider from "@mui/material/Slider";

import { useState } from 'react';
// import axios from 'axios';

import ListForm from '../components/signup/ListForm';

const inintialBusiness = {
  companyName: '',
  industry: '',
  size: '',
  password: '',
  websiteURL: '',
  socialMediaLinks: [],
  description: '',
  targetAudience: '',
  campaignGoals: [],
  generalRequest: [],
  budgetRange: {
    min: undefined,
    max: undefined
  },
  contactInformation: {
    email: String,
    phone: String,
    address: String,
  },
  preferredInfluencerProfile: {
    field: String,
    followerCount: Number,
    engagementRate: Number,
  },
  accountManager: {
    name: String,
    email: String,
    phone: String,
  }
}

const industryOptions = ['nothing'];
const sizeOptions = ['nothing'];
const audienceOptions = ['nothing'];
const fieldOptions = [
  "Gaming",
  "Beauty and Makeup",
  "Fashion",
  "Fitness and Health",
  "Technology and Gadgets",
  "Food and Cooking",
  "Travel",
  "DIY and Crafts",
  "Parenting and Family",
  "Lifestyle",
  "Education and Learning",
  "Business and Entrepreneurship",
  "Photography and Videography",
  "Music and Dance",
  "Sports and Athletics",
  "Wellness and Mental Health",
  "Home Decor and Interior Design",
  "Art and Design",
  "Science and Innovation",
  "Environmental Sustainability and Eco-Living"
];

const BusinessSignup = () => {
  const [business, setBusiness] = useState({ ...inintialBusiness })


  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post("http://localhost:3001/influencers", business);
    //   console.log(response)
    //   setBusiness(inintialBusiness);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }

  };

  const handleNameChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, companyName: e.target.value }))
  const handleSizeChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, size: e.target.value }))
  const handleIndustryChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, industry: e.target.value }))
  const handleDescriptionChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, description: e.target.value }))
  const handleTargetAudienceChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, targetAudience: e.target.value }))
  const handleWebsieteChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, websiteURL: e.target.value }))
  const handlePasswordChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, password: e.target.value }))

  const handleEmailChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      contactInformation:
      {
        ...oldBusiness.contactInformation,
        email: e.target.value
      }
    }
  ))
  const handleAddressChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      contactInformation:
      {
        ...oldBusiness.contactInformation,
        address: e.target.value
      }
    }
  ))
  const handlePhoneChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      contactInformation:
      {
        ...oldBusiness.contactInformation,
        phone: e.target.value
      }
    }
  ))
  const handleInfluencerFieldChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      preferredInfluencerProfile:
      {
        ...oldBusiness.preferredInfluencerProfile,
        field: e.target.value
      }
    }
  ))

  const handleInfluecerFollowersChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      preferredInfluencerProfile:
      {
        ...oldBusiness.preferredInfluencerProfile,
        followerCount: e.target.value
      }
    }
  ))

  const handleAudienceEngagementChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      preferredInfluencerProfile:
      {
        ...oldBusiness.preferredInfluencerProfile,
        engagementRate: e.target.value
      }
    }
  ))

  const handleManagerNameChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      accountManager:
      {
        ...oldBusiness.accountManager,
        name: e.target.value
      }
    }
  ))
  const handleManagerEmailChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      accountManager:
      {
        ...oldBusiness.accountManager,
        email: e.target.value
      }
    }
  ))
  const handleManagerphoneChange = e => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      accountManager:
      {
        ...oldBusiness.accountManager,
        phone: e.target.value
      }
    }
  ))

  const handleAddSocialMediaLink = () => setBusiness(oldBusiness => (
    { ...oldBusiness, socialMediaLinks: [...oldBusiness.socialMediaLinks, ''] }
  ))
  const handleDeleteSocialMediaLink = index => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      socialMediaLinks: oldBusiness.socialMediaLinks
        .slice(0, index)
        .concat(oldBusiness.socialMediaLinks.slice(index + 1))
    }
  ))
  const handleChangeSocialMediaLink = (changedIndex, e) => setBusiness(oldBusiness => (
    {
      ...oldBusiness, socialMediaLinks: oldBusiness.socialMediaLinks
        .map((link, index) => (
          index === changedIndex ? e.target.value : link
        ))
    }
  ))
  const handleAddGoals = () => setBusiness(oldBusiness => (
    { ...oldBusiness, campaignGoals: [...oldBusiness.campaignGoals, ''] }
  ))
  const handleDeleteGoals = index => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      campaignGoals: oldBusiness.campaignGoals
        .slice(0, index)
        .concat(oldBusiness.campaignGoals.slice(index + 1))
    }
  ))
  const handleChangeGoals = (changedIndex, e) => setBusiness(oldBusiness => (
    {
      ...oldBusiness, campaignGoals: oldBusiness.campaignGoals
        .map((goal, index) => (
          index === changedIndex ? e.target.value : goal
        ))
    }
  ))
  const handleAddRequest = () => setBusiness(oldBusiness => (
    { ...oldBusiness, generalRequest: [...oldBusiness.generalRequest, ''] }
  ))
  const handleDeleteRequest = index => setBusiness(oldBusiness => (
    {
      ...oldBusiness,
      generalRequest: oldBusiness.generalRequest
        .slice(0, index)
        .concat(oldBusiness.generalRequest.slice(index + 1))
    }
  ))
  const handleChangeRequest = (changedIndex, e) => setBusiness(oldBusiness => (
    {
      ...oldBusiness, generalRequest: oldBusiness.generalRequest
        .map((request, index) => (
          index === changedIndex ? e.target.value : request
        ))
    }
  ))

  const handleBugdtChange = (e, range) => setBusiness(oldBusiness => (
    { ...oldBusiness, budgetRange: { min: range[0], max: range[1] } }
  ))


  return (
    <Box>
      {/* TODO: the title needs some styles */}
      <Typography component="h1" variant="h4" align="center">
        Business Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="companyName"
          label="Company name"
          type="text"
          autoFocus
          value={business.companyName}
          onChange={handleNameChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Company email address"
          autoComplete="email"
          value={business.contactInformation.email}
          onChange={handleEmailChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Company address"
          value={business.contactInformation.address}
          onChange={handleAddressChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Company phone number"
          type="number"
          value={business.contactInformation.phone}
          onChange={handlePhoneChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="website"
          label="Website URL"
          autoComplete="url"
          value={business.websiteURL}
          onChange={handleWebsieteChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={business.password}
          onChange={handlePasswordChange}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="industry">Industry</InputLabel>
          <Select
            labelId="industry"
            id="industry"
            value={business.industry}
            label="industry"
            onChange={handleIndustryChange}
          >
            {industryOptions.map(industry => <MenuItem key={industry} value={industry}>{industry}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="size">Company size</InputLabel>
          <Select
            labelId="size"
            id="size"
            value={business.size}
            label="company size"
            onChange={handleSizeChange}
          >
            {sizeOptions.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="audience">Target audience</InputLabel>
          <Select
            labelId="audience"
            id="audience"
            value={business.targetAudience}
            label="target audience"
            onChange={handleTargetAudienceChange}
          >
            {audienceOptions.map(audience => <MenuItem key={audience} value={audience}>{audience}</MenuItem>)}
          </Select>
        </FormControl>

        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          label="Description"
          type="text"
          id="description"
          value={business.description}
          onChange={handleDescriptionChange}
        />

        <FormControl fullWidth margin="normal" required>
          {/* <InputLabel HTMLFor="age" >Audience age range</InputLabel> */}
          <FormLabel>Audience age range</FormLabel>
          <Slider
            // labelId='age-label'
            id="budget"
            value={[business.budgetRange.min, business.budgetRange.max]}
            onChange={handleBugdtChange}
            min={1}
            step={1}
            max={100}
            marks={[
              { value: business.budgetRange.min, label: business.budgetRange.min },
              { value: business.budgetRange.max, label: business.budgetRange.max },
            ]}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <FormLabel>Add campaign goals</FormLabel>
          <ListForm
            list={business.campaignGoals}
            handleAdd={handleAddGoals}
            handleDelete={handleDeleteGoals}
            handleChange={handleChangeGoals}
            label={'campaign goal'}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <FormLabel>Add general requests</FormLabel>
          <ListForm
            list={business.generalRequest}
            handleAdd={handleAddRequest}
            handleDelete={handleDeleteRequest}
            handleChange={handleChangeRequest}
            label={'request'}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <FormLabel>Add social media links</FormLabel>
          <ListForm
            list={business.socialMediaLinks}
            handleAdd={handleAddSocialMediaLink}
            handleDelete={handleDeleteSocialMediaLink}
            handleChange={handleChangeSocialMediaLink}
            label={'link'}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="influencerField">What Influeners field do you prefer</InputLabel>
          <Select
            labelId="influencerField"
            id="influecerField"
            value={business.preferredInfluencerProfile.field}
            label="What Influeners field do you prefer"
            onChange={handleInfluencerFieldChange}
          >
            {fieldOptions.map(audience => <MenuItem key={audience} value={audience}>{audience}</MenuItem>)}
          </Select>
        </FormControl>

        <TextField
          margin="normal"
          required
          fullWidth
          id="numberOfFollowers"
          label="Number of Influencer's followers"
          type="number"
          value={business.contactInformation.followerCount}
          onChange={handleInfluecerFollowersChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="engagement"
          label="Influencer's followers's engagemetn rate"
          type="number"
          value={business.contactInformation.engagementRate}
          onChange={handleAudienceEngagementChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="ManagerName"
          label="Manager name"
          type="text"
          value={business.accountManager.name}
          onChange={handleManagerNameChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="ManagerEmail"
          label="Manager email address"
          autoComplete="email"
          value={business.accountManager.email}
          onChange={handleManagerEmailChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="managerPhone"
          label="Manager phone number"
          type="number"
          value={business.accountManager.phone}
          onChange={handleManagerphoneChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

export default BusinessSignup;