module.exports = (req, res) =>{
  const hubChallenge = req.query['hub.challenge'];

  const hubMode = req.query['hub.mode'];
  console.log(hubMode);
  const verifyTokenMatches = (req.query['hub.verify_token'] === 'bot_test');
  console.log(verifyTokenMatches);

  if(hubMode && verifyTokenMatches){
    res.status(200).send(hubChallenge);
  }
  else {
    res.status(403).end();
  }
}
