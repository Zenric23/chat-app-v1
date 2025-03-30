import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleLogo from '../assets/google-logo.png';
import useAuth from '../hooks/useAuth';
import logo from '../assets/chat-nato-ni-logo.png';
import ChatIcon1 from '../assets/chat-icon-1.png';
import ChatIcon2 from '../assets/chat-icon-2.png';
import ChatIcon3 from '../assets/chat-icon-3.png';
import ChatIcon4 from '../assets/chat-icon-4.png';
import ChatIcon5 from '../assets/chat-icon-5.png';
import { useGoogleLogin } from '@react-oauth/google';
import { callPublicRoute } from '../helpers/axiosHelpers';
import { useState } from 'react';

const Login = () => {
  const { handleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      const res = await callPublicRoute({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo',
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
      });
      await handleLogin(res.data);
      setLoading(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      // name: '',
      email: '',
      submitErr: null
    },
    validationSchema: Yup.object({
      // name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required')
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      try {
        const loginDetails = { name: values.name, email: values.email };
        await handleLogin(loginDetails);
      } catch (error) {
        console.log(error);
        setErrors({ submitErr: error.response.data });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div onSubmit={formik.handleSubmit} className='fixed inset-0  bg-gradient-to-b from-indigo-500 to-indigo-600'>
      <form noValidate className='bg-white py-10 px-6 rounded-md border shadow-xl max-w-[450px] mx-auto mt-[20vh] space-y-4 z-50'>
        <img src={logo} className='h-10 w-fit mx-auto mb-10' />

        {/* <div className='space-y-2 pb-2'>
          <div className='grid gap-1'>
            <label className={`${formik.touched.email && formik.errors.email ? 'text-red-600 ' : 'text-gray-700 '}`}>Email</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name='email'
              placeholder='Enter email'
              className={`border rounded-md px-2 py-4 w-full outline-none focus:ring-2 focus:ring-indigo-600 transition ${formik.touched.email && formik.errors.email && 'border-red-600 focus:ring-1 focus:ring-red-600'}`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='pl-2 text-sm text-red-600 mt-2'>{formik.errors.email}</div>
            ) : null}
          </div>
        </div> */}
        {/* <div className='space-y-2'>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name='name'
            placeholder='Name'
            className='border rounded-md p-2 w-full outline-none focus:ring-2 focus:ring-indigo-600 transition'
          />
          {formik.touched.name && formik.errors.name ? (
            <div className='pl-2 text-sm text-red-600'>{formik.errors.name}</div>
          ) : null}
        </div> */}
        {/* <button
          type='submit'
          className={`px-2 py-3 !mt-5 rounded-md w-full bg-indigo-600 text-gray-50 font-semibold ${formik.isSubmitting && 'opacity-50'}`}
        >
          Login
        </button>
        <div className='flex items-center space-x-2'>
          <div className='flex-1 border-t' />
          <span className='text-gray-500 text-sm'>OR</span>
          <div className='flex-1 border-t' />
        </div> */}
        <button
          onClick={() => login()}
          type='button'
          className={`flex items-center bg-indigo-600 text-white px-2 py-3 rounded-md font-medium w-full gap-3 justify-center ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
        >
          <div className='rounded-md bg-white p-1'>
            <img src={GoogleLogo} className='h-6' />
          </div>
          <span>Sign in with Google</span>
        </button>
        {formik.errors.submitErr && (
          <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md'>{formik.errors.submitErr}dsadsada</div>
        )}
        {/* <p className='text-indigo-600 text-center pt-4 cursor-pointer'>Don&apos;t have an account?</p> */}
      </form>

      {/* icon logos */}
      <img src={ChatIcon1} className='h-52 absolute top-[10%] left-[10%] -z-10 hidden lg:block' />
      <img src={ChatIcon2} className='h-52 absolute top-[10%] right-[10%] -z-10 hidden lg:block' />
      <img src={ChatIcon3} className='h-52 absolute bottom-[20%] right-[10%] -z-10 hidden lg:block' />
      <img src={ChatIcon4} className='h-52 absolute bottom-[20%] left-[10%] -z-10 hidden lg:block' />
      <img src={ChatIcon5} className='h-48 absolute bottom-[10%] left-1/2 -translate-x-1/2 -z-10 hidden lg:block' />
    </div>
  );
};

export default Login;
