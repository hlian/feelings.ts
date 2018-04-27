export const template = `
<!doctype html>
<html>
  <head>
    <title>feelings.blackfriday</title>
    <link rel="stylesheet" href="/css.css?1">
    <meta charset="utf8">
  </head>
  <body>
    <h1>feelings.blackfriday</h1>
    <p>
      {{#currentlyFriday}}it's friday in NYC{{/currentlyFriday}}
      {{^currentlyFriday}}it's not friday in NYC{{/currentlyFriday}}
    </p>
    <p>feelings submitted on a non-friday will be punished with a cosmopolitan light-gray text color</p>
    <p>slide into our DMs <a href="tel://1631400FEEL">+1631400FEEL</a> // check out <a href="http://frogfeels.com">FROG FEELS</a></p>
    <form action="/feeling" method="post">
      <p><textarea placeholder="how are you feeling" name="text" tabindex="1"></textarea></p>
      <p><input type="submit" tabindex="2"></p>
    </form>

    <h2>feelings</h2>
    {{#feelings}}
    <p class="{{^friday}}timeslip{{/friday}} {{#phone}}phone{{/phone}}">{{text}}{{^text}}&nbsp;{{/text}}</p>
    {{/feelings}}
  </body>
</html>
`;

export const css = `
html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video{margin:0;padding:0;font-size:100%;vertical-align:baseline}
body{line-height:1}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
nav ul{list-style:none}
blockquote,q{quotes:none}
blockquote:before,blockquote:after,q:before,q:after{content:none}
a{margin:0;padding:0;font-size:100%;vertical-align:baseline;background:transparent}
ins{background-color:#ff9;color:#000;text-decoration:none}
mark{background-color:#ff9;color:#000;font-style:italic;font-weight:bold}
del{text-decoration:line-through}
abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}
table{border-collapse:collapse;border-spacing:0}
hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}
input,select{vertical-align:middle}

* {overflow: inherit; box-sizing: inherit}
html {overflow: auto; box-sizing: border-box}
* {
    box-sizing: border-box;
}

body {
    padding: 2em 10%;
    font-family: monospace;
    line-height: 2;
}

p {
    margin: 1em 0;
}

textarea {
    width: 100%;
    font-family: monospace;
    padding: 1em;
}

form > p {
    overflow: visible;
}

input {
    font-family: monospace;
    overflow: visible;
    margin: 3px;
}

input:focus {
    box-shadow: 0 0 3px red;
}

.timeslip {
    color: #999;
}

.phone {
    margin-left: -2rem;
}

.phone:before {
    content: "💬 ";
    width: 2rem;
    display: inline-block;
}
`;
