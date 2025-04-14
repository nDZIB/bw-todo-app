import * as yup from 'yup';

export const taskSchema = yup.object({
  title: yup.string().required('Title is required').max(255, 'Title cannot be longer than 255 characters'),
  description: yup.string().required('Description is required'),
});