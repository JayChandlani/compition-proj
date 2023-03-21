import { Grid, Typography, Box, TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Formik } from 'formik'
import * as yup from "yup";
import Dropzone from 'react-dropzone'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    picture: "",
    aadhar: "",
    fraud: ""
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object().shape({
    fullName: yup.string().required("Please enter your fullname").max(25, "Not more than 25 characters").min(3, "Minimum 3 characters"),
    email: yup.string().email("invalid email").max(40, "Not more than 40 characters"),
    picture: yup.string().required("Please upload aadhar card"),
    message: yup.string().required("Please enter you message").max(250, "Not more than 250 characters"),
    phoneNumber: yup.string().matches(phoneRegExp, 'Please provide a valid Phone number').min(10, "At leat 10 digits").max(10, "Not More then 10 digits").required("Please enter your phone number"),
    // aadhar: yup.string().matches(aadharRegExp, 'Please provide a valid aadhar number').min(12, "At leat 12 digits").max(12, "Not More then 12 digits").required("Please enter your aadhar number"),
    fraud: yup.string().required("Please select type of fraud"),

})
const ComplaintForm = ({ handleCountDown }) => {

    const handleFormSubmit = async (values, onSubmitProps) => {
        // this allows us to send form info with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);
        const savedUserResponse = await fetch(
            "https://socialissue-backend.onrender.com/register",
            {
                method: "POST",
                body: formData,
            }

        );
        const savedUser = await savedUserResponse.json();
        if (savedUser) {
            handleCountDown(savedUser, true);
        }
        onSubmitProps.resetForm();
    };

    return (
        <>
            <Typography variant="h4"
                sx={{
                    py: 2,
                    color: 'primary.main',
                    fontWeight: 500,
                    fontSize: { xs: 20, md: 26 }
                }} >
                Fill The Form To Get Help in  Recovering Your Loss and Faster Resolution
            </Typography>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={schema}
            >{({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item md={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select">Type Of Fraud</InputLabel>
                                <Select
                                    labelId="select"
                                    name="fraud"
                                    onBlur={handleBlur}
                                    value={values.fraud}
                                    label="Type Of Fraud"
                                    onChange={handleChange}
                                    error={
                                        Boolean(touched.fraud) && Boolean(errors.fraud)
                                    }
                                    helperText={touched.fraud && errors.fraud}
                                >
                                    <MenuItem value={"UPI Payment Fraud"}>UPI Payment Fraud</MenuItem>
                                    <MenuItem value={"Olx Scam"}>Olx Scam</MenuItem>
                                    <MenuItem value={"Other Cyber Fraud"}>Other Cyber Fraud</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label={<Typography sx={{ display: 'flex' }}>Full Name<Typography color={"red"}>*</Typography></Typography>}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.fullName}
                                name="fullName"
                                error={
                                    Boolean(touched.fullName) && Boolean(errors.fullName)
                                }
                                helperText={touched.fullName && errors.fullName}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label={"Email (optional)"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label={<Typography sx={{ display: 'flex' }}>Phone Number<Typography color={"red"}>*</Typography></Typography>}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phoneNumber}
                                name="phoneNumber"
                                error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label={<Typography sx={{ display: 'flex' }}>Aadhar Number<Typography color={"red"}>*</Typography></Typography>}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.aadhar}
                                name="aadhar"
                                error={Boolean(touched.aadhar) && Boolean(errors.aadhar)}
                                helperText={touched.aadhar && errors.aadhar}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed grey`}
                                        p="1rem"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                            <Typography sx={{ display: 'flex' }}><CloudUploadIcon />Upload Your Aadhar Here</Typography>
                                        ) : (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label={<Typography sx={{ display: 'flex' }}>Message<Typography color={"red"}>*</Typography></Typography>}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.message}
                                name="message"
                                error={Boolean(touched.message) && Boolean(errors.message)}
                                helperText={touched.message && errors.message}
                            />
                        </Grid>
                    </Grid>
                    <Box>
                        <Button fullWidth variant='outlined'
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            )}
            </Formik>
        </>

    )
}

export default ComplaintForm