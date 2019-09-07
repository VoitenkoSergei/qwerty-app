import React from 'react';

function Login(){
	return (
		<form id="form">
		  <p>Please enter your Login and Password</p>
		  <label>
		     <input id="auth_login" type="text" name="login" placeholder="LOGIN" required />
		  </label>
		  <label>
		     <input id="auth_password" type="password" name="last-name" placeholder="PASSWORD" required />
		  </label>
		  <label>
		     <input id="auth" type="submit" name="log" value="LOG IN" />
		  </label>
		  <p>Lorem ipsum dolor sit amet,<br />
		     consectetur adipisicing elit.
		  </p>
		  <div id="errLogin"></div>
		</form>
		);
}

export default Login;