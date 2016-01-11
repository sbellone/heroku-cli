'use strict';

let cli     = require('heroku-cli-util');
let format_date = require('./format_date.js');

module.exports = function(cert, message) {
  let log_message = message || 'Certificate details:';
  cli.log(log_message);
  cli.styledObject({
    'Common Name(s)': cert.ssl_cert.cert_domains,
    'Expires At':     format_date(cert.ssl_cert.expires_at),
    'Issuer':         cert.ssl_cert.issuer,
    'Starts At':      format_date(cert.ssl_cert.starts_at),
    'Subject':        cert.ssl_cert.subject
  });

  if (cert.ssl_cert['ca_signed?']) {
    cli.log("SSL certificate is verified by a root authority.");
  } else if (cert.issuer === cert.subject) {
    cli.log("SSL certificate is self signed.");
  } else {
    cli.log("SSL certificate is not trusted.");
  }
};


