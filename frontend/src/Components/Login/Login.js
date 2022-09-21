import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'



const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        try {
            const data = { username: this.state.username, password: this.state.password };
            const userWithToken = await axios.post(baseUrl + '/login', data)
            await this.props.dispatch(addToken(userWithToken.data.token))
            await this.props.dispatch(addUser(userWithToken.data.user));
        } catch {
            alert("Login was unsuccessful!!!  Check the username and password for accuracy.")
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <body className="login--body">
                <div className="login--container">
                    <h1 className="login--title">Tindinner</h1>
                    <h1>Please Sign In</h1>
                    <div className="login--email">
                        <label class="sr-only">Username</label>
                        <input className="login--usernameText"
                            type="email"
                            id="username"
                            name="username"
                            class="form-control"
                            placeholder="Email"
                            v-model="user.username"
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="login--password">
                        <label class="sr-only">Password</label>
                        <input className="login--passwordText"
                            type="password"
                            id="password"
                            name="password"
                            class="form-control"
                            placeholder="Password"
                            v-model="user.password"
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <button className="login--signin" type="submit" onClick={this.handleLogin}>Sign in</button>
                    <br/>
                    <Link className="login--register" to="/register">Need an account?</Link>
                </div>
            </body>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));