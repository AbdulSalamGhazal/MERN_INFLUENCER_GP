import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";
import useAuth from "../../context/AuthContext";

import PlatformInput from "../components/signup/PlatformInput"
import { businessGoals, businessIndustries, businessSizes, audienceInterests } from "../utils/lists";
import patterns from "../utils/patterns";



const MyAccountBusiness = ({ user }) => {
  const { login } = useAuth()
  const [budgetRange, setBudgetRange] = useState(user.budgetRange || { min: 1000, max: 5000 })
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...user,
      image: undefined,
      socialMediaLinks: user.socialMediaLinks.length && user.socialMediaLinks || [' ']
    }
  });

  const {
    fields: socialMediaLinks,
    append: appendLink,
    remove: removeLink } = useFieldArray({
      control,
      name: 'socialMediaLinks', // unique name for your Field Array
      rules: { minLength: 1 },
    });

  const {
    fields: generalRequest,
    append: appendGeneralRequest,
    remove: removeGeneralRequest } = useFieldArray({
      control,
      name: 'generalRequest', // unique name for your Field Array
    });

  const onSubmit = async (inputs) => {
    setWaiting(true);
    try {
      console.log(inputs)
      console.log(budgetRange)
      const { data } = await axios.patch(
        `http://localhost:3001/business/${user._id}`,
        { ...inputs, image: inputs.image[0], budgetRange },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      login(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setSuccessAlert('تم تحديث المعلومات بنجاح')
      setTimeout(() => {
        setSuccessAlert(null);
      }, 3000);
      setWaiting(false)
    } catch (error) {
      setWaiting(false)
      console.error("Error fetching data:", error);
      setErrorAlert(error.message);
      setTimeout(() => {
        setErrorAlert(null);
      }, 3000);
    }
  };

  const handleBugdtChange = (e, range) => setBudgetRange({ min: range[0], max: range[1] });

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1, maxWidth: '500px', mx: 'auto' }}
      >
        <Divider sx={{ my: 1, fontSize: '.75em' }}>
          معلومات الشركة
        </Divider>
        <TextField
          {...register("companyName", { required: "هذا الحقل مطلوب" })}
          error={errors.companyName}
          helperText={errors.companyName?.message}
          margin="dense"
          size="small"
          required
          fullWidth
          label="الاسم"
          type="text"
          // autoFocus
          autoComplete="organization"
        />

        <TextField
          {...register("email", {
            required: "هذا الحقل مطلوب",
            pattern: {
              value: patterns.emailPattern,
              message: "Please enter a valid email address.",
            },
          })}
          error={errors.email}
          helperText={errors.email?.message}
          margin="dense"
          size="small"
          required
          fullWidth
          label="البريد الالكتروني"
          type="email"
          autoComplete="email"
          disabled
        />

        <TextField
          {...register("address", { required: "هذا الحقل مطلوب" })}
          error={errors.address}
          helperText={errors.address?.message}
          margin="dense"
          size="small"
          required
          fullWidth
          label="العنوان"
          type="text"
          autoComplete="address-level2"
        />

        <TextField
          {...register("websiteURL", {
            required: "هذا الحقل مطلوب",
            pattern: {
              value: patterns.urlPattern,
              message: "Please enter a valid URL.",
            },
          })}
          error={errors.websiteURL}
          helperText={errors.websiteURL?.message}
          margin="dense"
          size="small"
          required
          fullWidth
          label="رابط الموقع الالكتروني"
          type="url"
          autoComplete="url"
        />

        <TextField
          {...register("image", {
            required: user.image ? false : "هذا الحقل مطلوب",
          })}
          error={errors.image}
          helperText={errors.image?.message}
          margin="dense"
          size="small"
          required={user.image == undefined}
          fullWidth
          label="ارفع صورة الحساب"
          type="file"
          InputLabelProps={{ shrink: true }}
        />

        <Controller
          name='industry'
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              margin="dense"
              size="small"
              required
              helperText={errors.industry?.message}
              select
              {...register("industry", { required: "هذا الحقل مطلوب" })}
              error={errors.industry}
              label="القطاع"
              defaultValue={getValues('industry') || ''}
              {...field}
            >
              {businessIndustries.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name='size'
          control={control}
          render={({ field }) => (

            <TextField
              fullWidth
              margin="dense"
              size="small"
              required
              select
              {...register("size", { required: "هذا الحقل مطلوب" })}
              error={errors.size != undefined}
              helperText={errors.size?.message}
              label="حجم الشركة"
              defaultValue={getValues('size') || ''}
              {...field}
            >
              {businessSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
              <TextField
                {...register("description", { required: "هذا الحقل مطلوب" })}
                error={errors.description}
                helperText={errors.description?.message}
                margin="dense"
                size="small"
                required
                fullWidth
                multiline
                label="الوصف"
                type="text"
              />
            </TextField>
          )}
        />

        <Divider sx={{ my: 1, fontSize: '.75em' }}>
          حسابات التواصل الاجتماعي
        </Divider>
        {socialMediaLinks.map((link, index) => (
          <PlatformInput
            dir='ltr'
            key={link.id} // important to include key with platform's id
            {...register(`socialMediaLinks.${index}`, {
              required: socialMediaLinks.length === 1 ? 'يجب ان تضيف حسابا واحدا على الاقل' : 'يجب ملئ هذا الحقل او حذفه',
              pattern: {
                value: patterns.urlPattern,
                message: 'غير صالح'
              }
            })}
            error={errors?.socialMediaLinks && Boolean(errors?.socialMediaLinks)}
            helperText={errors?.socialMediaLinks && errors?.socialMediaLinks[index]?.message}
            margin="dense"
            size="small"
            label='حسابات التواصل الاجتماعي'
            required
            fullWidth
            handleDelete={() => removeLink(index)}
            removable={socialMediaLinks.length > 1}
            link={getValues(`socialMediaLinks.${index}`) || ' '}
          />
        ))}
        <IconButton onClick={() => appendLink(' ')} color="primary" aria-label="add field">
          <AddCircleOutlineIcon />
        </IconButton>

        <Divider sx={{ my: 1, fontSize: '.75em' }}>
          معلومات الحملة
        </Divider>

        <FormControl fullWidth margin="dense"
          size="small" required>
          <FormLabel>ميزانية الحملة</FormLabel>
          <Slider
            value={[budgetRange.min, budgetRange.max]}
            onChange={handleBugdtChange}
            min={100}
            step={100}
            max={100000}
            marks={[
              {
                value: budgetRange.min,
                label: `${budgetRange.min}ر.س`,
              },
              {
                value: budgetRange.max,
                label: `${budgetRange.max}ر.س`,
              },
            ]}
          />
        </FormControl>

        <Controller
          name='targetAudience'
          control={control}
          render={({ field }) => (

            <TextField
              fullWidth
              margin="dense"
              size="small"
              required
              select
              {...register("targetAudience", { required: "هذا الحقل مطلوب" })}
              error={errors.targetAudience}
              helperText={errors.targetAudience?.message}
              label="الجمهور المستهدف"
              SelectProps={{
                multiple: true,
                renderValue: (selected) => selected.join(", "),
              }}
              defaultValue={user.targetAudience || []}
              {...field}
            >
              {audienceInterests.map((audience) => (
                <MenuItem key={audience} value={audience}>
                  <Checkbox
                    checked={getValues('targetAudience')?.indexOf(audience) > -1}
                  />
                  <ListItemText primary={audience} />
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name='campaignGoals'
          control={control}
          render={({ field }) => (

            <TextField
              fullWidth
              margin="dense"
              size="small"
              required
              select
              {...register("campaignGoals", { required: "هذا الحقل مطلوب" })}
              error={errors.campaignGoals}
              helperText={errors.campaignGoals?.message}
              label="اهداف الحملة"
              SelectProps={{
                multiple: true,
                renderValue: (selected) => selected.join(", "),
              }}
              defaultValue={user.campaignGoals || []}
              {...field}
            >
              {businessGoals.map((goal) => (
                <MenuItem key={goal} value={goal}>
                  <Checkbox checked={getValues('campaignGoals')?.indexOf(goal) > -1} />
                  <ListItemText primary={goal} />
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Divider sx={{ my: 1, fontSize: '.75em' }}>
          الطلبات العامة
        </Divider>

        {generalRequest.map((req, index) => (
          <PlatformInput
            defaultValue={getValues('generalRequest')}
            dir='rtl'
            key={req.id} // important to include key with platform's id
            {...register(`generalRequest.${index}`, {
              required: 'يجب ملئ هذا الحقل او حذفه',
            })}
            error={errors?.generalRequest && Boolean(errors?.generalRequest)}
            helperText={errors?.generalRequest && errors?.generalRequest[index]?.message}
            margin="dense"
            size='small'
            label='طلب'
            required
            fullWidth
            handleDelete={() => removeGeneralRequest(index)}
            removable={true}
          />
        ))}
        <IconButton onClick={() => appendGeneralRequest(' ')} color="primary" aria-label="add field">
          <AddCircleOutlineIcon />
        </IconButton>

        <Divider sx={{ my: 1, fontSize: '.75em' }}>
          الرد الآلي
        </Divider>
        <TextField
          {...register("autoReply")}
          error={errors.autoReply}
          helperText={errors.autoReply?.message}
          margin="dense"
          size="small"
          fullWidth
          multiline
          label="رسالة الرد الآلي"
          type="text"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          {waiting ? <CircularProgress color="inherit" size={23} /> : "تحديث المعلومات"}
        </Button>
        <Button
          href='/'
          size="small"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ my: 1 }}
        >الصفحة الرئيسية
        </Button>
        {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
        {successAlert && <Alert severity="success">{successAlert}</Alert>}
      </Box>
    </Box>
  );
};

export default MyAccountBusiness;
