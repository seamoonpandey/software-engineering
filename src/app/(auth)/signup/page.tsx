'use client'
import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '@/components/Typography';
import AppForm from '@/components/form/AppForm';
import { email, required } from '@/components/form/validation';
import RFTextField from '@/components/RFTextField';
import FormButton from '@/components/form/FormButton';
import FormFeedback from '@/components/form/FormFeedback';
import { useRouter } from 'next/navigation'; 

function SignUp() {
  const [sent, setSent] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const router = useRouter();

  const validate = (values: { [index: string]: string }) => {
    const errors = required(['name', 'email', 'password', 'phone', 'address', 'profilePic'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values: { name: string; email: string; password: string; phone: string; address: string; profilePic: string }) => {
    setSent(true);
    setSubmitError(null);
    try {
      await axios.post('http://localhost:8000/api/users', {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        profilePic: values.profilePic,
      });
      // Redirect to login page on successful registration
      router.push('/signin'); 
    } catch (error: any) {
      setSubmitError(error.response?.data?.message || 'Something went wrong, please try again.');
      setSent(false);
    }
  };

  return (
    <AppForm>
      <React.Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign Up
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/signin" underline="always">
            Already have an account?
          </Link>
        </Typography>
      </React.Fragment>
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true }}
        validate={validate}
      >
        {({ handleSubmit: handleSubmit2, submitting }) => (
          <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
            <Field
              autoFocus
              component={RFTextField}
              disabled={submitting || sent}
              autoComplete="name"
              fullWidth
              label="Name"
              name="name"
              required
            />
            <Field
              autoComplete="email"
              component={RFTextField}
              disabled={submitting || sent}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="password"
              autoComplete="new-password"
              label="Password"
              type="password"
              margin="normal"
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="phone"
              autoComplete="tel"
              label="Phone"
              margin="normal"
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="address"
              autoComplete="street-address"
              label="Address"
              margin="normal"
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="profilePic"
              autoComplete="photo"
              label="Profile Picture URL"
              margin="normal"
            />
            <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) =>
                submitError ? (
                  <FormFeedback error sx={{ mt: 2 }}>
                    {submitError}
                  </FormFeedback>
                ) : null
              }
            </FormSpy>
            {submitError && (
              <FormFeedback error sx={{ mt: 2 }}>
                {submitError}
              </FormFeedback>
            )}
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              disabled={submitting || sent}
              color="secondary"
              fullWidth
            >
              {submitting ? 'In progress…' : 'Sign Up'}
            </FormButton>
          </Box>
        )}
      </Form>
    </AppForm>
  );
}

export default SignUp;
