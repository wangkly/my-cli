
module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            "@babel/preset-env",
            {
                "targets":{
                    "ie":"11",
                    "edge":"17",
                    "chrome":"67",
                    "firefox":"60",
                    "safari":"11.1"
                },
                "useBuiltIns": "usage",
                "corejs":3
            }
        ],
        "@babel/preset-react"]
    const plugins = ["@babel/plugin-transform-runtime","@babel/plugin-proposal-class-properties"]
    return{
        presets,
        plugins
    }   
}
