function returnRegisterMail(mail) {
  return {
    from: 'r21billard@gmail.com',
    to: mail,
    subject: 'this is the register mail',
    text: 'That was easy!',
  };
}

module.exports = { returnRegisterMail, };