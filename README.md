# Trader Gator

Trader Gator is a simple stock trading application that initializes you with $5,000, allows you to purchase stocks at their current price, view your portfolio and its performance, and explore your transaction history.
The application is built with a [React](https://reactjs.org/) frontend and [Ruby on Rails](http://rubyonrails.org) for the API. The application uses live stock data from [IEX Cloud](https://iexcloud.io/). You can find the hosted application on heroku here: 

## Running Locally

Make sure you have [Ruby](https://www.ruby-lang.org), [Bundler](http://bundler.io), [NPM](https://www.npmjs.com/), and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed. Go to the [IEX Cloud](https://iexcloud.io/) website and signup for an account to access API keys. (For real live data, you need to pay but you can experiment with their Sandbox endpoint which services dummy data.) Set environment variables locally for "IEX_API_SECRET_TOKEN" and "IEX_API_PUBLISHABLE_TOKEN." 
 
```sh
git clone git@github.com:heroku/trader-gater.git # or clone your own fork
cd trader-gater
bundle
rake start
```
(rake start runs heroku local -f Procfile.dev)

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Resources

1. [IEX documentation](https://iexcloud.io/docs/api/)

2. [IEX Ruby client library](https://github.com/dblock/iex-ruby-client)

3. [React documentation](https://reactjs.org/docs/getting-started.html)

4. [Ruby on Rails documentation](https://guides.rubyonrails.org/)

5. [A Rock Solid, Modern Web Stack—Rails 5 API + ActiveAdmin + Create React App on Heroku](https://blog.heroku.com/a-rock-solid-modern-web-stack)

6. [Using Rails Session Cookies for API Authentication](https://pragmaticstudio.com/tutorials/rails-session-cookies-for-api-authentication)

7. [React with Rails User Authentication](https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact
If you want to contact me, you can reach out at anna@annajcarey.com.

## License

Copyright (c) 2020 Anna Carey

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
