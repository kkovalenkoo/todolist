import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {loginTC} from './auth-reducer'
import {AppRootStateType} from '../../app/store'
import {Navigate} from 'react-router-dom'

export const Login = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            if (!values.email) return {email: 'Email is required'}
            if (!values.password) return {password: 'Password is required'}
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (isLoggedIn) return <Navigate replace to={'/todolist'}/>

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                               checked={formik.values.rememberMe}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

