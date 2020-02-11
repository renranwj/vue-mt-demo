// 配置接口
const express = require("express");
const app = express();
// const apiRoutes = express.Router();
// app.use('/api', apiRoutes);

//读取json数据
const goods = require("./data/goods.json");
const ratings = require("./data/ratings.json");

const seller = require("./data/seller.json");

module.exports = {
    publicPath: '/',
    devServer: {
        open: true,
        host: "localhost",
        before(app) {
            app.get("/api/goods", (req, res) => {
                res.json(goods)
            });
            app.get("/api/ratings", (req, res) => {
                res.json(ratings)
            });
            app.get("/api/seller", (req, res) => {
                res.json(seller)
            });

        }
    }
}
