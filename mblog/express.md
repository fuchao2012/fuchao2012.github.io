# express

## 拔

手里拿到的这个版本是2015年的，不算老旧，用来学 Nodejs 网页开发也算刚刚好。当前轻量级的网页构建技术层出不穷，回归原生之风靡盛。

但工具创造之始，便是加速工程化发展，定有其深思熟虑可参考学习之处。

>  自己写拔也是好笑

## 初识Express

将好坏放在一边，喜欢用代码对比的方式辨明孰优孰劣。源码来写一个静态服务器。

```javascript
const fs = require('fs');
const path = require('path');
const http = require('http');

const sendStaticFile = (reqPath)=>{
    fs.readFile(path.join(__dirname, reqPath), (err, data)=>{
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 - Internal Error');
            }else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data)
            }
        })
}

http.createServer((res, req)=>{
    let reqPath = req.url.replace(/\?(?:\?.*)?$/, '').toLowerCase();
    sendStaticFile(reqPath)
}).listen(3000);
console.log('Server is running at localhost:3000')
```

其中用到了三个工具库，可以理解为c语言的标准库，path是用来解析路径的，fs用来处理文件系统，http既是静态资源的核心库，所以写这样的一个服务器难度不在于代码，而在于见识。

多说无益，直接上express版本

```javascript
const app = require('express')();
app.set('port', process.env.PORT || 3000);

const sendStaticFile = async (reqPath) =>{
    try {
        const fileContent = await fs.readFile(reqPath);
        res.type('text/html');
        res.status(200);
        res.send(fileContent)    
    } catch (err) {
        err && console.log(err.stack);
        res.status(500);
        res.type('text/plain');
        res.send('500 - Internal Error');
    }    
};
// static
app.use((res, req)=>{
  let reqPath = req.url.replace(/\?(?:\?.*)?$/, '').toLowerCase();
  sendStaticFile(reqPath)  
});

// 404 
app.use((req, res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found')
});

// 500 
app.use((err, req, res)=>{
    err && console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Internal Error')
});

```

乍一看，代码竟还多了，实际上鲁棒且清晰了许多。需要注意的是几点。

1. express中位置放置先后颇为重要
2. 使用了 res.type/status/send app.use/app.VERB 等关键字替代原有的"繁杂"的写法

## 渲染页面

除了返回字段之外，还能够渲染后返回HTML，如果渲染的是模板，则可以实现动态的渲染，通过URI的变化返回不同的页面结构。

文中推崇使用`handlebars`，其实到不必拘泥于模板使用什么，毕竟是模板，又不是标准语言，所以无论好坏都登不上大雅之堂。

* main.hbs

```handlebars
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                         <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>Document</title>
</head>
<body>
  {{body}}
</body>
</html>
```
* templates/home.hbs

```handlebars 
<h1>Wlecome to Fuchao's Express Class </h1>
```

* templates/about.hbs

```handlebars
<h1>About Fuchao's blog</h1>
```

* templates/404.hbs 

```handlebars
<h1>404 - Not Found</h1>
```

* templates/500.hbs

```handlebars
<h1>500 - Internal Error</h1>
```

```javascript
const app = require('express')();
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: './templates/'
}));
app.set('view engine', 'handlebars');


app.get('/', res=>res.render('home'));
app.get('/aobut', res=>res.render('about'));

app.use(res=>{
    res.status(404);
    res.render('404')
});
app.use(res=>{
    res.status(500);
    res.render('500')
})
```

如果需要加载其他静态资源，比如css/img这些，需要使用到express.static的描述

```javascript
app.use(express.static(__dirname + '/public'))
```

如此便可以直接在HTML中使用绝对地址引用静态文件了
