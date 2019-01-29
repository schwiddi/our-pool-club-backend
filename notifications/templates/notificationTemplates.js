function completeRegistration(receiver, username, regkey) {
  return {
    from: '"Pool Club" <r21billard@gmail.com>',
    to: receiver,
    subject: 'Welcome & Complete Registration',
    text: `Activate Account Link: ${process.env.BACKEND_HTTP_URL}:${process.env.BACKEND_HTTP_PORT}/api/v1/users/completeRegistration/${regkey}`,
    html: `
      <h3>Hi ${username},</h3>
      <p>this here is the activation mail for your account that you've just created.</p>
      <p></p>
      <p>Please use the following Link to complete the registration Process.</p>
      <p></p>
      <p>${process.env.BACKEND_HTTP_URL}:${process.env.BACKEND_HTTP_PORT}/api/v1/users/completeRegistration/${regkey}</p>
      <p></p>
      <p>Cheers</p>
      <p>your Pool Club Team</p>`,
  };
}

module.exports = { completeRegistration, };