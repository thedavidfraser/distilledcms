module.exports = {

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