# FakerTaker
DEMO: [https://fakertaker.herokuapp.com](https://fakertaker.herokuapp.com)

FakerTaker: Takes client to the given url while faking it using meta tags

[FakerTaker](https://fakertaker.herokuapp.com) is an application like [goo.gl](https://goo.gl). It redirects the user from one point to another but it's main purpose is not to shorten the url or anything. Instead, it's main purpose is to hide the identity of the real website. [Goo.gl](https://goo.gl) service gives a [301](https://en.wikipedia.org/wiki/HTTP_301) and doesn't hide the real identity of the website which let's facebook show the real details of the website. 

Such as a link like [https://goo.gl/6LNcJl](https://goo.gl/6LNcJl) displays the following facebook post

![facebook post card for this github repository](http://i.imgur.com/uBsL34C.png)

## Technique for faking
In order to fake it, a three line JavaScript code is used, nothing more. The technique can be modified depending on how 
smart websites like facebook and twitter become

```js
var anchor = document.createElement("a")
anchor.href = "#{redirect_url}" // #{redirect_url} denotes the url we have to redirect to
anchor.click()
```
These lines are enough to execute what we want to execute. This logic is present in [redirector.pug](views/redirector.pug).

### Objects responsible for faking it
`<meta />` is by far the main culprit for **faking** without this tag I won't think it would be possible. The [OpenGraph](https://ogp.me) protocol made possible. This meta data is scraped by the sites. Such as property `og:image` is used for determining the image used for the site in the displaying.

Twitter also uses metadata and there exists standardize properties which can do a lot. Such as `twitter:card` but these aren't implemented.

#### LICENSE
Licensed under MIT LICENSE. See [LICENSE](LICENSE) for more details.