'use strict';

var request = require('request-json');

function Fastspring(store_id, api_username, api_password, company_id) {

  this.store_id = store_id || process.env.FS_STORE_ID;
  this.company_id = company_id || process.env.FS_COMPANY_ID || store_id || process.env.FS_STORE_ID;

  this.client = request.newClient('https://api.fastspring.com/');
  this.client.setBasicAuth(
    api_username || process.env.FS_USERNAME,
    api_password || process.env.FS_PASSWORD
  );

}

Fastspring.prototype.getSubscription = function (subscriptionRef, cb) {

  var url = this.supscriptionURL(subscriptionRef);
  this.requestHandler(url, cb);
};

Fastspring.prototype.supscriptionURL = function (reference) {

  var url = 'company/'+this.company_id+'/subscription/'+reference;
  return url;
};

Fastspring.prototype.requestHandler = function (url, cb) {
  this
    .client
    .get(url, function (error, response, body) {

      if (error) {
        return cb(error);
      }
      cb(null, body);
    });
};

module.exports.Fastspring = Fastspring;
