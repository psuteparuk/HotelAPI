## Hotel API

This is a simple HTTP server written in Node.js to demonstrate how one can go about implementing a rate limiting API keys scheme.

# Usage

You need to have `node` and `npm` installed on your machine. Download the patch and run `npm install`. To start the server, simply run `npm start`. Now you can go to http://127.0.0.1 and try endpoints such as `/hotels` or `/hotels/1`. Note that you need to specify the API key in the request header with 'X-API-Key'. The list of valid API keys can be found in `config.js`.

# Endpoints supported
- /hotels
- /hotels?city=:city
- /hotels?order=[asc|desc]
- /hotels/:id
