import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const availabelFields = [
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

const PersonalInfoForm = ({
  name, setName,
  gender, setGender,
  email, setEmail,
  location, setLocation,
  image, setImage,
  field, setField,
  description, setDescription,
  interests, setInterests,
  password, setPassword }) => {
  return (
    <Box>

      <FormControl>

        <FormLabel id="gender">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        type="text"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="email"
        type="email"
        id="email"
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {/* TODO: shoud this be select? */}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Location"
        type="text"
        id="location"
        autoComplete="location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />

      {/* TODO: shoud this be url or file? */}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Image URL"
        type="url"
        id="image"
        // autoComplete="image"
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel id="field">select your field</InputLabel>
        <Select
          labelId="field"
          id="field"
          value={field}
          label="select your field"
          onChange={e => setField(e.target.value)}
        >
          {availabelFields.map(field => <MenuItem key={field} value={field}>{field}</MenuItem>)}
        </Select>
      </FormControl>

      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        label="How to describe your self"
        type="text"
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        label="What are your interests"
        type="text"
        id="interests"
        value={interests}
        onChange={e => setInterests(e.target.value)}
      />
    </Box>
  )
}

export default PersonalInfoForm