var mongoose= require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    sodh:Number,
    hoten:String,
    diachi:String,
    dienthoai:Number,
    email:String,
    ngaymua:String,
    dsmh:[{ma:String,tensanpham:String,soluong:Number,dongia:Number,thanhtien:Number}]
});

userTabledonhang = mongoose.model('donhang',userSchema);
module.exports.select = async function(query){
    var bangdonhang = await userTabledonhang.find(query);
    return bangdonhang;
}

module.exports.selectAll = async function(){
    var bangdonhang = await userTabledonhang.find({});
    return bangdonhang;
}
/*module.exports.insert = async function(newdonhang){
    var bangdonhang = await userTabledonhang.find().sort({sodh:1}).limit(1);
    var sodh=1;
   
    if (bangdonhang.length>0){
    var l=bangdonhang.length
    sodh=sodh+bangdonhang[l-1].sodh;
    }
    const donhang = new userTabledonhang({sodh:sodh,hoten:newdonhang.hoten,diachi:newdonhang.diachi,dienthoai:newdonhang.dienthoai,email:newdonhang.email,ngaymua:newdonhang.ngaymua,dsmh:newdonhang.dsmh});
    var userData = await donhang.save();
    return userData;
}*/

module.exports.dodai = async function(){
    var bangdonhang = await userTabledonhang.find({});
    var index=bangdonhang.length-1;
    var l=bangdonhang[index].sodh;
    return l;
}

/*module.exports.insert = async function(newdonhang){
    var bangdonhang = await userTabledonhang.find({});
    var sodh=1;
    if (bangdonhang.length>0){
    sodh=bangdonhang.length+1;
    }
    const donhang = new userTabledonhang({sodh:sodh,hoten:newdonhang.hoten,diachi:newdonhang.diachi,dienthoai:newdonhang.dienthoai,email:newdonhang.email,ngaymua:newdonhang.ngaymua,dsmh:newdonhang.dsmh});
    var userData = await donhang.save();
    return userData;
}*/
module.exports.insert = async function(newdonhang){
    var bangdonhang = await userTabledonhang.find().sort({_id:-1}).limit(1);
    var sodh=1;
    if (bangdonhang.length>0)
    sodh=sodh+bangdonhang[0].sodh;
    const donhang = new userTabledonhang({sodh:sodh,hoten:newdonhang.hoten,diachi:newdonhang.diachi,dienthoai:newdonhang.dienthoai,email:newdonhang.email,ngaymua:newdonhang.ngaymua,dsmh:newdonhang.dsmh});
    var userData = await donhang.save();
    return userData;
}
