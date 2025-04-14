import * as yup from 'yup';

export const userSchema = yup.object({
  username: yup.string().required('Username is required').max(255, 'Username cannot be longer than 255 characters'),
  password: yup.string().required('Password is required').min(8, 'Password must be atleast 8 characters'),
});