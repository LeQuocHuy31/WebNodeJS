var mongoose= require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    idCat:String,
    nameCat:String,
});

userCategory=mongoose.model('loaisp',userSchema);
module.exports.select=async function(){
    var userData=await userCategory.find({});
    return userData;
}

module.exports.selectcapnhap=async function(query){
    var userData=await userCategory.find(query);
    return userData;
}
module.exports.insert = async function (newloai){
    var bangloai = await userCategory.find().sort({_id:-1}).limit(1);
    maloai=1;
    if (bangloai.length>0)
        maloai+=bangloai[0].idCat*1;
    const loai = new userCategory({
       idCat:maloai,
       nameCat:newloai.nameCat,
    });
    var userData = await loai.save();
    return userData;
}
module.exports.update=async function(query,nameCat){
    var loai =await userCategory.updateOne(query,{$set:{nameCat: nameCat}});
    return loai;
}
module.exports.delete=async function(query){
    var loai = await userCategory.deleteOne(query);
    return "";
}