function cors(req, res, next) {
  if (req.method === 'OPTIONS') {
    let headers = {};
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400';
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override,Authorization, Content-Type, Accept';

    res.writeHead(200, headers);
    res.end();
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }
}

export default cors;
