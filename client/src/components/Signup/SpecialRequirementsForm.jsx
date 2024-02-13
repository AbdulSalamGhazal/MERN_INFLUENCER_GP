import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

import ListForm from './ListForm';


const SpecialRequirementsForm = ({ requirements, setRequirements }) => {

  const handleAdd = () => {
    setRequirements(oldReqs => [...oldReqs, '']);
  };

  const handleDelete = (deletedIndex) => {
    setRequirements(oldReqs => oldReqs.filter((_, index) => index !== deletedIndex))
  }

  const handleChange = (index, e) => {
    setRequirements(oldReqs => oldReqs.slice(0, index).concat([e.target.value, ...oldReqs.slice(index+1)]))
  }

  return (
    <Box>
      <FormLabel>Add your special requirements</FormLabel>
      <ListForm 
        list={requirements} 
        handleAdd={handleAdd} 
        handleDelete={handleDelete} 
        handleChange={handleChange}
        label={"write any special requirement"}/>
    </Box>
  );
}

export default SpecialRequirementsForm;