// Here goes the schema for the form
import * as yup from 'yup'

const formSchema = yup.object().shape({
    email: yup
      .string()
      .email('Must be a valid email address.')
      .required('Must include email address.'),
    username: yup
      .string()
      .min(3, 'Username must be at least 3 characters long.')
      .required('Username is Required'),
    civil: yup
        .string()
        .oneOf(['single', 'married'], 'you must select a civil status'),
    role: yup
      .string()
      .oneOf(['student', 'alumni', 'instructor', 'tl'], 'You must select a role')
      .required('You must select a role')
      // required isn't required for checkboxes.
  });

  export default formSchema