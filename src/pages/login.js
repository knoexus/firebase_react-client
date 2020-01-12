import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    ...theme.styles
})

class login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    errors: err.response.data
                })
            })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { classes } = this.props
        const { errors, loading } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="dino" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
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
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" 
                            disabled={loading} className={classes.button}>
                            Login
                            {loading && (
                                <CircularProgress size={25} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
