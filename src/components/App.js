import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'
import formSchema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'
// 🔥 STEP 1- CHECK THE ENDPOINTS USING POSTMAN OR HTTPIE
// 🔥 STEP 2- FLESH OUT FriendForm.js
// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP


//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: '',
  email: '',
  ///// DROPDOWN /////
  role: '',
  ///// RADIO BUTTONS /////
  civil: '',
  ///// CHECKBOXES /////
  hobbies: {
    hiking: false,
    reading: false,
    coding: false,
  },
}
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialFriends = []
const initialDisabled = true


export default function App() {
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  const [friends, setFriends] = useState(initialFriends)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  //////////////// NETWORKING HELPERS ////////////////
  //////////////// NETWORKING HELPERS ////////////////
  //////////////// NETWORKING HELPERS ////////////////
  const getFriends = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://localhost:4000/friends`
    axios.get('http://localhost:4000/friends')
      .then(response =>{
        setFriends(response.data)
      })
      .catch(error =>{
        debugger
      })
  }

  const postNewFriend = newFriend => {
    axios.post('http://localhost:4000/friends', newFriend)
      .then(response =>{
        setFriends(friends.concat(response.data)) // return new array with new friends added to the end
        // setFriends([...friends, response.data])  same thing
      })
      .catch(error => {
        debugger
      })
      .finally(
        setFormValues(initialFormValues)
      )
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://localhost:4000/friends`
    //    and regardless of success or failure, the form should reset
  }

  //////////////// FORM ACTIONS ////////////////
  //////////////// FORM ACTIONS ////////////////
  //////////////// FORM ACTIONS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 11- RUN VALIDATION WITH YUP
    yup
      .reach(formSchema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const checkboxChange = (name, isChecked) => {
    // 🔥 STEP 7- IMPLEMENT!
    //  set a new state for the whole form
    setFormValues({
      ...formValues,
      hobbies: {
        ...formValues.hobbies,
        [name] : isChecked
      }
    })
  }

  const submit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      // 🔥 STEP 8- WHAT ABOUT HOBBIES?
      hobbies: Object.keys(formValues.hobbies).filter(h => {
        return formValues.hobbies[h] //only filter the truely
        }
      )}
    // 🔥 STEP 9- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend)
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    // 🔥 STEP 10- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid); 
    });
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
