import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import Slider from "@mui/material/Slider";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm } from "react-hook-form"
import axios from 'axios';

import ListForm from '../components/signup/ListForm';

const inintialBusiness = {
  companyName: '',
  email: '',
  address: '',
  industry: '',
  size: '',
  password: '',
  websiteURL: '',
  socialMediaLinks: [],
  description: '',
  targetAudience: [],
  campaignGoals: [],
  generalRequest: [],
  budgetRange: {
    min: 10,
    max: 30
  }
}

const industryOptions = [
  "Fashion",
  "Beauty",
  "Technology",
  "Food and Beverage",
  "Health and Wellness",
  "Entertainment",
  "Lifestyle",
  "Travel and Hospitality",
  "Sports and Fitness",
  "Education and Learning"
];
const sizeOptions = [
  "Startup: Fewer than 10 employees",
  "Small: 11 to 50 employees",
  "Medium: 51 to 250 employees",
  "Large: 251 to 1000 employees",
  "Enterprise: More than 1000 employees"
];
const audienceOptions = [
  "Fashion",
  "Technology",
  "Fitness",
  "Gaming",
  "Travel",
  "Food",
  "DIY Projects",
  "Entertainment",
  "Education",
  "Sustainability",
  "Health and Wellness",
  "Beauty",
  "Sports",
  "Music",
  "Photography",
  "Art and Design",
  "Personal Finance",
  "Parenting",
  "Outdoor Activities",
  "Literature and Reading"
];
const goalsOptions = [
  "Increase Brand Awareness",
  "Enhance Engagement",
  "Drive Traffic",
  "Generate Leads",
  "Boost Sales",
  "Promote a Product Launch",
  "Expand Market Reach",
  "Improve Customer Loyalty",
  "Gather Customer Feedback",
  "Create Branded Content"
];

const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:[-a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,}(?:\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/;
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordMinLength = 8;
const passwordMaxLength = 20;
const requiredChars = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\{\\}|;\':",<.>/?])[a-zA-Z0-9!@#$%^&*()_+\\-=\\{\\}|;\':",<.>/?]{${passwordMinLength},${passwordMaxLength}}$`);


const VisibilityToggler = ({showPassword, setShowPassword}) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword((show) => !show)}
        onMouseDown={() => setShowPassword((show) => !show)}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )
}


const BusinessSignup = () => {
  const navigate = useNavigate();
  const [business, setBusiness] = useState({ ...inintialBusiness })
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/business", business);
      console.log(response)
      setBusiness(inintialBusiness);
      navigate('/login')
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  const handleNameChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, companyName: e.target.value }))
  const handleSizeChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, size: e.target.value }))
  const handleIndustryChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, industry: e.target.value }))
  const handleDescriptionChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, description: e.target.value }))
  const handleTargetAudienceChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, targetAudience: e.target.value }))
  const handleWebsieteChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, websiteURL: e.target.value }))
  const handlePasswordChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, password: e.target.value }))
  const handleEmailChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, email: e.target.value }))
  const handleAddressChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, address: e.target.value }))
  const handleGoalsChange = e => setBusiness(oldBusiness => ({ ...oldBusiness, campaignGoals: e.target.value }))

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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          {...register("companyName", { required: 'this field is required' })}
          error={errors.companyName}
          helperText={errors.companyName?.message}
          margin="normal"
          required
          fullWidth
          id="companyName"
          label="Company name"
          type="text"
          // autoFocus
          autoComplete='organization'
          value={business.companyName}
          onChange={handleNameChange}
        />

        <TextField
          {...register("email", {
            required: 'this field is required', pattern: {
              value: emailPattern,
              message: 'Please enter a valid email address.',
            }
          })}
          error={errors.email}
          helperText={errors.email?.message}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Company email address"
          type="email"
          autoComplete="email"
          value={business.email}
          onChange={handleEmailChange}
        />

        <TextField
          {...register("address", { required: 'this field is required' })}
          error={errors.address}
          helperText={errors.address?.message}
          margin="normal"
          required
          fullWidth
          id="address"
          label="Company address"
          type='text'
          autoComplete="address-level2"
          value={business.address}
          onChange={handleAddressChange}
        />

        <TextField
          {...register("website", {
            required: 'this field is required', pattern: {
              value: urlPattern,
              message: 'Please enter a valid URL.',
            }
          })}
          error={errors.website}
          helperText={errors.website?.message}
          margin="normal"
          required
          fullWidth
          id="website"
          label="Website URL"
          type='url'
          autoComplete="url"
          value={business.websiteURL}
          onChange={handleWebsieteChange}
        />

        <TextField
          {...register("password", {
            required: 'this field is required', minLength: {
              value: passwordMinLength,
              message: 'Password must be at least 8 characters long.',
            },
            maxLength: {
              value: passwordMaxLength,
              message: 'Password must be at most 20 characters long.',
            },
            pattern: {
              value: requiredChars,
              message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
            }
          })}
          error={errors.password}
          helperText={errors.password?.message}
          margin="normal"
          required
          fullWidth
          label="Password"
          id="password"
          autoComplete="new-password"
          value={business.password}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <VisibilityToggler showPassword={showPassword} setShowPassword={setShowPassword} />
            )
          }}

        />
        <TextField
          {...register("confirmPassword", {
            required: 'this field is required',
            validate: {
              samePassword: e => e === business.password || 'the password is different'
            }
          })}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          margin="normal"
          required
          fullWidth
          label="Confirm password"
          id="confirmPassword"
          autoComplete="new-password"
          type={showPassword2 ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <VisibilityToggler showPassword={showPassword2} setShowPassword={setShowPassword2} />
            )
          }}
        // value={business.confirmPassword}
        // onChange={handleconfirmPasswordChange}
        />

        <TextField
          fullWidth
          margin="normal"
          required
          helperText={errors.industry?.message}
          select
          {...register("industry", { required: 'this field is required' })}
          error={errors.industry}
          id="industry"
          value={business.industry}
          label="industry"
          onChange={handleIndustryChange}
        >
          {industryOptions.map(industry => <MenuItem key={industry} value={industry}>{industry}</MenuItem>)}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          required
          select
          {...register("size", { required: 'this field is required' })}
          error={errors.size}
          helperText={errors.size?.message}
          id="size"
          value={business.size}
          label="company size"
          onChange={handleSizeChange}
        >
          {sizeOptions.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          required
          select
          {...register("audience", { required: 'this field is required' })}
          error={errors.audience}
          helperText={errors.audience?.message}
          id="audience"
          value={business.targetAudience}
          label="target audience"
          onChange={handleTargetAudienceChange}
          SelectProps={{
            multiple: true,
            renderValue: (selected) => selected.join(', '),
          }}
        >
          {audienceOptions.map(audience => (
            <MenuItem key={audience} value={audience}>
              <Checkbox checked={business.targetAudience.indexOf(audience) > -1} />
              <ListItemText primary={audience} />
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...register("description", { required: 'this field is required' })}
          error={errors.description}
          helperText={errors.description?.message}
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
            // {...register("budget", {required: 'this field is required'})}
            // error={errors.budget}
            // helperText={errors.budget?.message}
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

        <TextField
          fullWidth
          margin="normal"
          required
          helperText={errors.industry?.message}
          select
          {...register("goals", { required: 'this field is required' })}
          error={errors.goals}
          id="goals"
          value={business.campaignGoals}
          label="campaign goals"
          onChange={handleGoalsChange}
          SelectProps={{
            multiple: true,
            renderValue: (selected) => selected.join(', '),
          }}
        >
          {goalsOptions.map(goal => (
            <MenuItem key={goal} value={goal}>
              <Checkbox checked={business.campaignGoals.indexOf(goal) > -1} />
              <ListItemText primary={goal} />
            </MenuItem>
          ))}
        </TextField>

        <FormControl
          fullWidth margin="normal" >
          <FormLabel>Add general requests</FormLabel>
          <ListForm
            register={register}
            errors={errors}
            list={business.generalRequest}
            handleAdd={handleAddRequest}
            handleDelete={handleDeleteRequest}
            handleChange={handleChangeRequest}
            label={'request'}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" >
          <FormLabel>Add social media links</FormLabel>
          <ListForm
            register={register}
            errors={errors}
            list={business.socialMediaLinks}
            handleAdd={handleAddSocialMediaLink}
            handleDelete={handleDeleteSocialMediaLink}
            handleChange={handleChangeSocialMediaLink}
            label={'link'}
          />
        </FormControl>


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