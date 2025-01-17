'use client';
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { email, required } from '@/components/form/validation';
import AppForm from '@/components/form/AppForm';
import FormButton from '@/components/form/FormButton';
import FormFeedback from '@/components/form/FormFeedback';
import RFTextField from '@/components/RFTextField';
import { Typography } from '@mui/material';

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:8000/api/users/profile', { withCredentials: true });
        router.push('/dashboard');
      } catch (error) {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, [router]);

  const validate = (values: { [index: string]: string }) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

const handleSubmit = async (values: { email: string; password: string }) => {
    setSent(true);
    setSubmitError(null);

    try {
        // Make API call to sign in
        const response = await axios.post('http://localhost:8000/api/users/auth', {
            email: values.email,
            password: values.password,
        }, {
            withCredentials: true
        });

        // Store token data in local storage
        localStorage.setItem('_id', response.data._id);
        localStorage.setItem('isAdmin', response.data.isAdmin);
        localStorage.setItem('token', response.data.token);

        // Redirect to dashboard upon successful sign-in
        router.push('/dashboard');
    } catch (error: any) {
        setSubmitError(error.response?.data?.message || 'Something went wrong, please try again.');
        setSent(false);
    }
};

  // Show a loading spinner or some UI element while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppForm>
      <React.Fragment>
        <Typography variant="h3" gutterBottom align="center" component="h3">
          {"Sign In"}
        </Typography>
        <Typography variant="body2" align="center">
          {'Not a member yet? '}
          <Link
            href="/signup"
            align="center"
            underline="always"
          >
            Sign Up here
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
              autoComplete="email"
              autoFocus
              component={RFTextField}
              disabled={submitting || sent}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
              size="large"
            />
            <Field
              fullWidth
              size="large"
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="password"
              autoComplete="current-password"
              label="Password"
              type="password"
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
              size="large"
              color="secondary"
              fullWidth
            >
              {submitting || sent ? 'In progress…' : 'Sign In'}
            </FormButton>
          </Box>
        )}
      </Form>
      <Typography align="center">
        <Link underline="always" href="#">
          Forgot password?
        </Link>
      </Typography>
    </AppForm>
  );
}

export default SignIn;
