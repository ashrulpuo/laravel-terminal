(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};!function(e,n,r){var o,i,s,u,c,a,h,p;return c=e("meta[name='csrf-token']").attr("content"),e.ajaxSetup({headers:{"X-CSRF-TOKEN":c}}),h=n.Terminal.environment,a=n.Terminal.endPoint,o=function(){var t,e,n,r;return t=["/","|","\\","-"],r=null,n=50,e=null,{show:function(o){var i;return o.disable(),e=o.get_prompt(),i=0,r=setInterval(function(){return o.set_prompt(t[i++]),i>t.length-1?i=0:void 0},n)},hide:function(t){return clearInterval(r),t.enable(),t.set_prompt(e)}}}(),s=function(){function n(e,n,r){null==e&&(e="white"),null==n&&(n="black"),this.options=null!=r?r:[],this.apply=t(this.apply,this),this.ansi=t(this.ansi,this),this.is=t(this.is,this),this.foreground=this.ansi(e),this.background=this.ansi(n)}return n.prototype.colorList={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white",39:"white"},n.prototype.backgroundList={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white",49:"black"},n.prototype.colors=e.extend({},e.terminal.ansi_colors.bold,{white:e.terminal.ansi_colors.normal.white,red:e.terminal.ansi_colors.normal.red}),n.prototype.is=function(t,e,n){return null==t&&(t="white"),null==e&&(e="black"),this.options=null!=n?n:[],t===this.foreground&&e===this.background},n.prototype.ansi=function(t){return this.colors[t]?this.colors[t]:t},n.prototype.apply=function(t){return t=e.terminal.escape_brackets(t),"[[;"+this.foreground+";"+this.background+"]"+t+"]"},n}(),i=function(){function n(){this.apply=t(this.apply,this),this.question=t(this.question,this),this.comment=t(this.comment,this),this.info=t(this.info,this),this.error=t(this.error,this)}return n.prototype.formatters={error:new s("white","red"),info:new s("green"),comment:new s("yellow"),question:new s("black")},n.prototype.error=function(t){return this.formatters.error.apply(t)},n.prototype.info=function(t){return this.formatters.info.apply(t)},n.prototype.comment=function(t){return this.formatters.comment.apply(t)},n.prototype.question=function(t){return this.formatters.question.apply(t)},n.prototype.apply=function(t,n){var r;return r=new RegExp("(\\033\\[(\\d+)(;\\d+)?m(((?!\\033\\[\\d+).)*)\\033\\[(\\d+)(;\\d+)?m)|(\\[|\\])","g"),t=t.replace(r,function(t){return function(){var n,r;switch(r=arguments,console.log(r),!1){case-1===e.inArray(r[0],["[","]"]):return e.terminal.escape_brackets(r[0]);default:switch(n=e.terminal.escape_brackets(r[4]),!1){case"32"!==r[2]:return t.info(n);case"33"!==r[2]:return t.comment(n);case"37"!==r[2]:return console.log(123),t.error(n);default:return r[0]}}}}(this)),n&&e.each(t.split("\n"),function(t){return function(t,e){return""===e&&(e=" "),n.echo(e)}}(this)),t},n}(),p=new i,new(u=function(){function n(){this.greetings=t(this.greetings,this),this.execute=t(this.execute,this),this.commandArtisan=t(this.commandArtisan,this),this.rpcRequest=t(this.rpcRequest,this),this.interpreter=t(this.interpreter,this),this.toBoolean=t(this.toBoolean,this),this.confirm=t(this.confirm,this),this.question=t(this.question,this),this.comment=t(this.comment,this),this.info=t(this.info,this),this.error=t(this.error,this),this.color=t(this.color,this),e(r.body).terminal(function(t){return function(e,n){return t.execute(n,e)}}(this),{onInit:function(t){return function(e){return t.execute(e,"list")}}(this),onBlur:function(t){return function(){return!1}}(this),greetings:this.greetings()})}var i;return n.prototype.ids={},n.prototype.colors=e.terminal.ansi_colors,n.prototype.color=function(t,e,n){return null==n&&(n="bold"),this.colors[n]&&this.colors[n][t]?this.colors[n][t]:t},n.prototype.error=function(t){return p.error(t)},n.prototype.info=function(t){return p.info(t)},n.prototype.comment=function(t){return p.comment(t)},n.prototype.question=function(t){return p.question(t)},n.prototype.confirm=function(t,n,r){var o;return o=e.Deferred(),t.echo(r),t.echo(n),t.push(function(e){return function(n){o.resolve(e.toBoolean(n)),t.pop()}}(this),{prompt:">"}),o.promise()},n.prototype.toBoolean=function(t){switch(t.toLowerCase()){case"y":case"yes":return!0;default:return!1}},n.prototype.interpreter=function(t,e,n){return n||(n=t),e.push(function(n){return function(r){return r=r.trim(),r&&n.execute(e,t.replace(/\s+/g,"-")+" "+r),!1}}(this),{prompt:n+">"}),!1},n.prototype.rpcRequest=function(t,n){return this.ids[n.method]=this.ids[n.method]||0,o.show(t),e.ajax({url:a,dataType:"json",type:"post",data:{jsonrpc:"2.0",id:++this.ids[n.method],cmd:n}}).success(function(e){return function(e){return p.apply(e.result,t)}}(this)).error(function(e,n,r){return p.error(e.status+": "+r,t)}).complete(function(){return o.hide(t)})},i=function(t){return""+t.charAt(0).toUpperCase()+t.slice(1)},n.prototype.commandArtisan=function(t,n){var r,o,i;return r=e.terminal.parseCommand(n.rest.trim()),i=["",this.comment("**************************************"),this.comment("*     Application In Production!     *"),this.comment("**************************************"),""].join("\n"),o=this.info("Do you really wish to run this command? [y/N] (yes/no)")+" "+this.comment("[no]")+": ","production"===h&&-1===e.inArray("--force",r.args)&&(0===r.name.indexOf("migrate")&&-1===r.name.indexOf("migrate:status")||0===r.name.indexOf("db:seed"))?void this.confirm(t,o,i).done(function(e){return function(r){return r===!0?e.rpcRequest(t,n):(t.echo(" "),t.echo(""+e.comment("Command Cancelled!")),t.echo(" "))}}(this)):this.rpcRequest(t,n)},n.prototype.interpreters={mysql:"mysql","artisan tinker":"tinker",tinker:"tinker"},n.prototype.execute=function(t,n){var r,o,s,u;switch(n=n.trim()){case"help":r=e.terminal.parseCommand("list"),this.rpcRequest(t,r);break;case"":return;default:u=this.interpreters;for(o in u)if(s=u[o],n===o)return void this.interpreter(s,t);r=e.terminal.parseCommand(n.trim()),this["command"+i(r.name)]?this["command"+i(r.name)](t,r):this.rpcRequest(t,r)}},n.prototype.greetings=function(){return[" __                        _    _____              _         _ ","|  |   ___ ___ ___ _ _ ___| |  |_   ____ ___ _____|_|___ ___| |","|  |__| .'|  _| .'| | | -_| |    | || -_|  _|     | |   | .'| |","|_____|__,|_| |__,|\\_/|___|_|    |_||___|_| |_|_|_|_|_|_|__,|_|","","Copyright (c) 2015 Recca Tsai <http://phpwrite.blogspot.tw/>","","Type a command, or type `"+this.info("help")+"`, for a list of commands.",""].join("\n")},n}())}(jQuery,window,document)}).call(this);