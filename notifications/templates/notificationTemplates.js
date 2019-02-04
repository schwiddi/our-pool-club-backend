function completeRegistration(receiver, username, regkey) {
  const url = `${process.env.BACKEND_HTTP_URL}:${process.env.BACKEND_HTTP_PORT}/api/v1/users/completeRegistration/${regkey}`;
  return {
    from: '"Pool Club" <r21billard@gmail.com>',
    to: receiver,
    subject: 'Welcome & Complete Registration',
    text: `Activate Account Link: ${url}`,
    html: `
            <h3>
              Hi ${username},
            </h3>
            <p>
              this here is the activation mail for your account that you've just created.
            </p>
            <p>
              Please use the following Link to complete the registration Process:<br>
              ${url}
            </p>
            <p>
              Cheers<br>
              your Pool Club Team
            </p>
          `,
  };
}

module.exports = { completeRegistration, };