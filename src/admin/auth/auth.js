import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {login, getMe} from "../../store/reducer/user";
import bgImage from '../../utils/img/bg-login2.jpg'
import logo from '../../utils/img/logo.png'

import {
    Avatar,
    Box,
    Button, CardMedia, Checkbox,
    Container,
    createTheme,
    CssBaseline, FormControlLabel, Grid, Link, Paper,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";

const theme = createTheme();



function Auth({authorization, login, getMe}) {
    let navigate = useNavigate();


    useEffect(() => {
        getMe()
    }, [])


    useEffect(() => {
        if (authorization)
            navigate('/dashboard')
    }, [authorization])


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const phoneNumber = data.get('phoneNumber')
        const password = data.get('password')
        if (phoneNumber && password)
            login({
                phoneNumber,
                password
            })
        else
            toast.error('You need to fill all inputs', {
                autoClose: 1500
            })
    };

    return  <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url('+bgImage+')',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'black', width:'25%',height:'25%',padding:'10px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '60%', display: { xs: 'none', sm: 'block' } }}
                            image={logo}
                            alt={'?'}
                        />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="phoneNumber"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>

}



export default connect(({user: {authorization}}) => ({authorization}),
    {login, getMe})(Auth);