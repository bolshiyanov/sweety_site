import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';

const GoogleAnalytics = () => {

    const { data = {} } = useSelector((state) => state.config);
    const googleAnalytics = data.googleAnalytics;

    useEffect(() => {

        ReactGA.initialize(googleAnalytics);
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    return (
        <div></div>
    );
}

export default GoogleAnalytics; 
