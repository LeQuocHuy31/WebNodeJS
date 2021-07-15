var mongoose= require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    idProduct:String,
    idCat:String,
    nameProduct:String,
    priceProduct:String,
    imgProduct:String,
    desProduct:String,
});
userProduct=mongoose.model('product',userSchema);
module.exports.selectAll=async function(){
    var userData=await userProduct.find({});
    return userData;
}

module.exports.select=async function(query){
    var userData=await userProduct.find(query);
    return userData;
}

module.exports.insert = async function (newsanpham){
    var bangsp = await userProduct.find().sort({_id:-1}).limit(1);
    maloai=1;
    if (bangsp.length>0)
        maloai+=bangsp[0].idProduct*1;

    const sanpham = new userProduct({
       idProduct:maloai,
       idCat:newsanpham.idCat,
       nameProduct:newsanpham.nameProduct,
       priceProduct:newsanpham.priceProduct,
       imgProduct:newsanpham.imgProduct,
       desProduct:newsanpham.desProduct
    });
    var userData = await sanpham.save();
    return userData;
}
module.exports.update=async function(query,idCat,nameProduct,priceProduct,imgProduct,desProduct){
    var sanpham = await userProduct.updateOne(query,{$set:{idCat:idCat,nameProduct:nameProduct,priceProduct:priceProduct,imgProduct:imgProduct,desProduct:desProduct}});
    return sanpham;
}
module.exports.delete=async function(query){
    var sanpham = await userProduct.deleteOne(query);
}