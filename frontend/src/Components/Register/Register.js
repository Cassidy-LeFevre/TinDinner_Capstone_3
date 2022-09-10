import axios from 'axios'
import {Link} from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import React from 'react'

export default function Register(props) {

    const [state, setState] = React.useState({
        username: '',
        password: '',
        confirmPassword: '',
        mode: 'entry'
    })

    function handleInputChange(event) {
        event.preventDefault()
        setState({...state, [event.target.name]: event.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = {username: state.username, password: state.password, confirmPassword: state.confirmPassword, role: 'USER'}
        let lowercase = 0
        let uppercase = 0
        let digit = 0
        if(state.password !== state.confirmPassword) {
            alert("Password and Confirm Password must match!!!")
            return
        }
        if(state.password.length < 8) {
            alert("Password must be at least 8 characters long!!!")
            return
        }
        for(let i = 0; i < state.password.length; i++) {
            if(isNaN(state.password.charAt(i))) {
                if(state.password.charAt(i) === state.password.charAt(i).toUpperCase()) uppercase++
                if(state.password.charAt(i) === state.password.charAt(i).toLowerCase()) lowercase++
            }
            else digit++
        }
        if(!(state.username.includes('@') && state.username.includes('.'))) {
            alert("A valid email address must be entered.")
            return
        }
        if(lowercase && uppercase && digit){
            axios.post(baseUrl + "/register", data)
            .then(function (response){
                setState({...state, mode: "ready"})
            })
            .catch(function (error){
                alert("The username (email) already exists!!!")
            })
        }
        else alert("Password must contain at least one capital letter, one lowercase letter and one number!!!")
    }

    return(
        <div className="register--page">
            {state.mode==="entry" && <form className="register--form">
                <h1 className="register--title" >Create Account</h1>
                <label class="sr-only">Username</label>
                <input className="register--email"
                    type="email"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="Email"
                    v-model="user.username"
                    onChange={handleInputChange}
                    required
                />
                <label class="sr-only">Password</label>
                <input className="register--password"
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="user.password"
                    onChange={handleInputChange}
                    required
                />
                <input className="register--confirmpassword"
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    v-model="user.password"
                    onChange={handleInputChange}
                    required
                />
                <Link to="/login" className="register--login">Have an account?</Link>
                <input className="register--submit" type="submit" onClick={handleSubmit} />
            </form>}
            {state.mode==="ready" && <Link to="/login" className="register--ready">Sign In</Link>}
        </div>
    )
}