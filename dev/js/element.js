module.exports = {

    html : '<!doctype html>\n<html>\n<head>\n{{head}}\n</head>\n<body>\n{{body}}\n</body>\n</html>',

    head : {
      charSet : '<meta charset="utf-8">',
      ieEngineVersion : '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
      viewport : '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',

      title : '<title>{{content}}</title>',
      description : '<meta name="description" content="{{content}}">',

      stylesheet : '<link rel="stylesheet" href="css/main.min.css" media="screen">'
    },

    block : {
      li : '<li>{{s}}</li>',
      heading : '<h{{n}} class="heading">{{s}}</h{{n}}>',
      introduction: '<p class="introduction">{{s}}</p>',
      p : '<p>{{s}}</p>'
//Keep for future use      end : '<p>{{s}}  <span class="end">('{{lang.end}})</span></p>'
    },

    inline : {
      siteName : '<span class="site-name">$1</span>',
      quotationMark : '<span class="quotation-mark">"</span>'
    },

    format : {
      level : '<div class="level level-{{levelCount}} depth-{{depth}}">{{content}}</div>',
      levelContent : '<div class="level-content level-{{levelCount}}-content">{{content}}</div>',
      levelContentInner : '<div class="level-content-inner level-{{levelCount}}-content-inner">{{content}}</div>',
      levelChildGroup : '<div class="level-child-group">{{content}}</div>',
      ul : '<ul>{{content}}</ul>',
      blockquote : '<blockquote>{{content}}</blockquote>'
    }

};