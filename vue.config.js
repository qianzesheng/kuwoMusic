const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // proxy:"http://192.168.36.28:3000/"
    proxy: {
        "/datajson":{
            target:"http://192.168.36.28:3000",
            changeOrigin:true,
            ws:false
        },
        "/":{
            target:"http://192.168.36.28:3000/",
            changeOrigin:true,
            ws:false
        }
    }
  }
})
