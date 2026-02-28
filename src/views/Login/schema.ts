import * as Yup from 'yup';

const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required').trim(),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').trim(),
})

export default LoginSchema;