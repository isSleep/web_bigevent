
//每次调用$.post()、$.get() 和 $.ajax() 的时候都会先调用 ajaxPrefilter这个函数
//在这个函数中我们可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的 Ajax 请求之前， 同一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})