// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import type { RouterHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";

import StyledIntro from "./Home.style";

const responseGoogle = response => {
  console.log(response);
};

type Props = {
  history: RouterHistory
};

const Home = ({ history }: Props) => (
  <React.Fragment>
    <GoogleLogin
      clientId="1033550430707-a9kr1ulnk0hj8v93teiu0ab8q4klfb6o.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  </React.Fragment>
);

export default Home;
