module.exports = {

  /* 
    All RegExp patters are wrapped with {{}} a la Handlebars
    Reserved RegExp patterns
      {{s}} : string
      {{n}} : new line with Level indentation
      {{n-}} | {{n---}} : new line with Level indentation and multiples of - indentation
  */

    html : '<!doctype html>\n<html>\n<head>\n{{head}}\n</head>\n<body>\n{{body}}\n</body>\n</html>',

    head : {
      charSet : '<meta charset="utf-8">',
      ieEngineVersion : '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
      viewport : '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',

      title : '<title>{{s}}</title>',
      description : '<meta name="description" content="{{s}}">',

      stylesheet : '<link rel="stylesheet" href="assets/css/main.min.css" media="screen">'
    },

    block : {
      li : '<li>{{s}}</li>',
      heading : '<h{{headingN}} class="heading">{{s}}</h{{headingN}}>',
      introduction : '<p class="introduction">{{s}}</p>',
      p : '<p>{{s}}</p>',
      paragraphWithCta : '<p class="cta">{{s}}</p>'
//Keep for future use      end : '<p class="has-tombstone">{{s}}  <span class="tombstone">('{{lang.end}})</span></p>'
    },

    inline : {
      siteName : '<span class="site-name">$1</span>',
      quotationMark : '<span class="quotation-mark">"</span>',
      anchorLink : '<a href="{{href}}">{{s}}</a>',
      anchorLinkExternal : '<a href="{{href}}" target="_blank" class="oianw">{{s}} <span class="oianw-text">(Opens in a new window)</span></a>'
    },

    format : {
      level : '{{n}}<div class="level level-{{levelCount}} depth-{{depth}}">{{content}}{{n}}</div>',
      levelContent : '{{n-}}<div class="level-content level-{{levelCount}}-content">{{content}}{{n-}}</div>',
      levelContentInner : '{{n--}}<div class="level-content-inner level-{{levelCount}}-content-inner">{{content}}{{n--}}</div>',
      levelContentPrefix : '{{n---}}',
      levelContentPrefixInner : '{{n----}}',
      levelChildGroup : '{{n-}}<div class="level-child-group">{{content}}{{n-}}</div>',
      ul : '{{n---}}<ul>{{n----}}{{content}}{{n---}}</ul>',
      blockquote : '{{n---}}<blockquote>{{ntttt}}{{content}}{{n---}}</blockquote>'
    }

};