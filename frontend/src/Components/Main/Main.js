import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './tindinner.css'
import tindinnerlogo from './tindinnerlogo.png'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())}
});

class Main extends Component {
    // constructor(props){
    //     super(props);
    // }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){
        return(
            <div className="main--container">
                {this.props.token.token !== undefined ?
                        <div className="main--navbar">
                            <div className="main--logohome">
                                <img src={tindinnerlogo} alt="logo" className="main--logo" />
                                <Link to='/home' className="main--home">HOME</Link>
                            </div>
                            <Link to='/login'  className="main--logout" onClick={this.handleLogout}>LOGOUT</Link> 
                            <Redirect to='/home'/>

                        </div>  
                    :   <div>
                            <img src={tindinnerlogo} alt="logo" className="main--logo" />
                            <Link to='/login' className="main--home">HOME</Link>
                        </div>
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : null}/>
                    <Redirect to='/login'/>
                </Switch>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));