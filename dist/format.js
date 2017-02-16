window.TwisonSavePath = "{{TwisonSavePath}}";
window.storyFormat({
  "name": "regw-Twison",
  "version": "0.0.1",
  "author": "Mike Lazer-Walker, Michael Afrides",
  "description": "Export your Twine 2 story as a JSON document and save",
  "proofing": false,
  "source": "<html>\r\n\t<head>\r\n\t\t<title>{% raw %}{{STORY_NAME}}{% endraw %}</title>\r\n\t\t<script type=\"text/javascript\">\r\n/**\r\n * Twison - Twine 2 JSON Export Story Format\r\n *\r\n * Copyright (c) 2015 Mike Walker\r\n * https://lazerwalker.com\r\n *\r\n * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and\r\n * associated documentation files (the \"Software\"), to deal in the Software without restriction,\r\n * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,\r\n * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,\r\n * subject to the following conditions:\r\n *\r\n * The above copyright notice and this permission notice shall be included in all copies or substantial\r\n * portions of the Software.\r\n *\r\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT\r\n * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\r\n * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\r\n * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE\r\n * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r\n */\r\nvar Twison={extractLinksFromText:function(t){var n=t.match(/\\[\\[.+?\\]\\]/g);if(n)return n.map(function(t){var n=t.match(/\\[\\[(.*?)\\-\\&gt;(.*?)\\]\\]/);return n?{name:n[1],link:n[2]}:(t=t.substring(2,t.length-2),{name:t,link:t})})},convertPassage:function(t){var n={text:t.innerHTML},e=Twison.extractLinksFromText(n.text);if(e&&(n.links=e),[\"name\",\"pid\",\"position\",\"tags\"].forEach(function(e){var a=t.attributes[e].value;a&&(n[e]=a)}),n.position){var a=n.position.split(\",\");n.position={x:a[0],y:a[1]}}return n.tags&&(n.tags=n.tags.split(\" \")),n},convertStory:function(t){var n=t.getElementsByTagName(\"tw-passagedata\"),e=Array.prototype.slice.call(n).map(Twison.convertPassage),a={passages:e};[\"name\",\"startnode\",\"creator\",\"creator-version\",\"ifid\"].forEach(function(n){var e=t.attributes[n].value;e&&(a[n]=e)});var o={};return a.passages.forEach(function(t){o[t.name]=t.pid}),a.passages.forEach(function(t){t.links&&t.links.forEach(function(t){t.pid=o[t.link],t.pid||(t.broken=!0)})}),a},convert:function(){var t=document.getElementsByTagName(\"tw-storydata\")[0],n=JSON.stringify(Twison.convertStory(t),null,2);document.getElementById(\"output\").innerHTML=n,window.Twison&&window.TwisonSavePath&&Twison.saveJSON(window.TwisonSavePath,n,function(){window.alert(\"Save successful.\")},function(t){window.alert(t)})},saveJSON:function(t,n,e,a){var o=new XMLHttpRequest;o.open(\"POST\",t),o.setRequestHeader(\"Content-Type\",\"application/json\"),o.onload=function(){200===o.status?e&&\"function\"==typeof e&&e(o.responseText):a&&\"function\"==typeof a&&a(o.statusText)},o.send(n)}};window.Twison=Twison;\r\n\t\t</script>\r\n\t</head>\r\n\t<body>\r\n\t\t<pre id=\"output\">\r\n\r\n\t\t</pre>\r\n\t\t<div id=\"storyData\" style=\"display: none;\">\r\n\t\t\t{% raw %}{{STORY_DATA}}{% endraw %}\r\n\t\t</div>\r\n\t\t<script>\r\n\t\t\tTwison.convert();\r\n\t\t</script>\r\n\t</body>\r\n</html>"
});