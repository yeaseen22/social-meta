import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../HOC/layout';
import PrivateRoute from './PrivateRouter';

import Home from '../components/Home';
import Profile from '../components/Profile';
import Login from '../components/Auth/login';
import Register from '../components/Auth/register';
import PostEdit from '../components/Profile/postEdit';

const Router = () => {
    return (
        <Layout>
            <Routes>
                {/* Home.. */}
                <Route path={'/'} exact element={ <PrivateRoute restrictionLoading={true} /> }>
                    <Route path={'/'} exact element={ <Home /> } />
                </Route>

                {/* Profile */}
                <Route path={'/profile/:userId'} exact element={ <PrivateRoute restrictionLoading={true} /> }>
                    <Route path={'/profile/:userId'} exact element={ <Profile /> } />
                </Route>

                {/* Login.. */}
                <Route path={'/login'} exact element={ <PrivateRoute restrictionLoading={false} /> }>
                    <Route path={'/login'} exact element={ <Login /> } />
                </Route>

                {/* Register.. */}
                <Route path={'/register'} exact element={ <PrivateRoute restrictionLoading={false} /> }>
                    <Route path={'/register'} exact element={ <Register /> } />
                </Route>

                {/* Temporary Route here */}
                {/* <Route path={'/temporary'} exact element={<Temporary />} /> */}

                {/* Edit Post.. */}
                <Route path={'/profile/editPost/:postId'} exact element={ <PrivateRoute restrictionLoading={true} /> }>
                    <Route path={'/profile/editPost/:postId'} exact element={ <PostEdit /> } />
                </Route>
            </Routes>
        </Layout>
    );
};

export default Router;
