import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from "@mui/material/Slider";


const availabelInterest = [
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
  

const AudienceInfoForm = ({
    totalFollowers, setTotalFollowers, 
    flowersLocations, setFollowersLocations, 
    age, setAge,
    genderPercent, setGenderPrecent,
    likes, setLikes,
    comments, setComments,
    interests, setInterests}) => {

  return (
    <Box 
        component="form" 
        onSubmit={e => e.preventDefault()} 
        noValidate
        sx={{ mt: 3 }}
        >
        
        <TextField
            margin="normal"
            required
            fullWidth
            name="totalFollowers"
            label="approximate number of followers"
            type="number"
            id="totalFollowers"
            value={totalFollowers}
            onChange={e => setTotalFollowers(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            label="Likes average"
            type="number"
            id="likes"
            value={likes}
            onChange={e => setLikes(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            label="Comments average"
            type="number"
            id="comments"
            value={comments}
            onChange={e => setComments(e.target.value)}
        />

        <FormControl id="location" fullWidth margin="normal" required>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
            labelId="location-label"
            id="location"
            label="location"
            multiple
            value={flowersLocations}
            onChange={e => setFollowersLocations(e.target.value)}
            >
                {/* TODO: there is duplication here with filter compoenet */}
                <MenuItem value={"Central"}>Central (e.g., Riyadh)</MenuItem>
                <MenuItem value={"Western"}>
                    Western (e.g., Jeddah, Mecca, Medina)
                </MenuItem>
                <MenuItem value={"Eastern"}>
                    Eastern (e.g., Dammam, Khobar, Al-Ahsa)
                </MenuItem>
                <MenuItem value={"Southern"}>
                    Southern (e.g., Abha, Najran, Jizan)
                </MenuItem>
                <MenuItem value={"Northern"}>
                    Northern (e.g., Tabuk, Al-Jouf)
                </MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
            <InputLabel id="interests">Select audience interests</InputLabel>
            <Select
            labelId="interests"
            id="interests"
            value={interests}
            label="select audience interests"
            onChange={e => setInterests(e.target.value)}
            multiple
            >
                {availabelInterest.map(interest => <MenuItem key={interest} value={interest}>{interest}</MenuItem>)}
            </Select>
        </FormControl>

        <FormControl id="age" fullWidth margin="normal" required>
            {/* <InputLabel HTMLFor="age" >Audience age range</InputLabel> */}
            <FormLabel>Audience age range</FormLabel>

            <Slider
            // labelId='age-label'
            id="age"
            aria-label="Custom marks"
            value={age}
            onChange={(e, newAge) => setAge(newAge)}
            min={3}
            step={1}
            max={80}
            marks={age.map(age => ({value: age, label: age}))}
            />
        </FormControl>

        <FormControl id="genderPrecent" fullWidth margin="normal" required>
            {/* <InputLabel HTMLFor="age" >Audience age range</InputLabel> */}
            <FormLabel>Male to female precent</FormLabel>

            <Slider
            // labelId='age-label'
            id="genderPrecent"
            aria-label="Custom marks"
            value={genderPercent}
            onChange={(e, newValue) => setGenderPrecent(newValue)}
            min={0}
            step={1}
            max={100}
            marks={[{value: genderPercent, label: `${genderPercent}% of males`}]}
            />
        </FormControl>
    </Box>
  )
}

export default AudienceInfoForm