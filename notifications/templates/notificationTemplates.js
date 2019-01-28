function completeRegistration(receiver) {
  return {
    from: 'r21billard@gmail.com',
    to: receiver,
    subject: 'this is the register mail',
    text: 'That was easy!',
  };
}

module.exports = { completeRegistration, };