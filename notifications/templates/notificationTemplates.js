function completeRegistration(receiver, username, regkey) {
  return {
    from: 'r21billard@gmail.com',
    to: receiver,
    subject: 'Welcome & Complete Registration',
    text:
      `
      Hi ${username},

      this here is the activation mail for your account that you've just created.

      Please use the following Link the complete the Registration process.

      Link: ${regkey}

      Cheers
      your Pool Club Team
      `
    ,
  };
}

module.exports = { completeRegistration, };