import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// redux
import { connect } from 'react-redux'
import { signUpUser } from '../redux/actions/userActions'

const styles = theme => ({
    ...theme.styles
})

class signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signUpUser(newUserData, this.props.history)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props
        const { errors } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="dino" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" 
                            className={classes.textField} value={this.state.email} 
                            onChange={this.handleChange} error={errors.email}
                            helperText={errors.email} fullWidth>
                        </TextField>
                        <TextField id="password" name="password" type="password" label="Password" 
                            className={classes.textField} value={this.state.password} 
                            onChange={this.handleChange} error={errors.password}
                            helperText={errors.password} fullWidth>
                        </TextField>
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
                            className={classes.textField} value={this.state.confirmPassword} 
                            onChange={this.handleChange} error={errors.confirmPassword}
                            helperText={errors.confirmPassword} fullWidth>
                        </TextField>
                        <TextField id="handle" name="handle" type="text" label="Handle" 
                            className={classes.textField} value={this.state.handle} 
                            onChange={this.handleChange} error={errors.handle}
                            helperText={errors.handle} fullWidth>
                        </TextField>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" 
                            disabled={loading} className={classes.button}>
                            Sign Up
                            {loading && (
                                <CircularProgress size={25} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>Already have an account? Log In <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signUpUser })(withStyles(styles)(signup))
