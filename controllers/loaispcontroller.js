var bangdanhmuc = require('../models/Loaisp');
module.exports.select = async function(){
	dsloaisp=await bangdanhmuc.select()
	var kq="";
	for(i=0;i<dsloaisp.length;i++)
 		{
			kq=kq + "<li><a href='/"+dsloaisp[i].idCat+"'>"+dsloaisp[i].nameCat+"</a></li>"
		}
    return kq;
}

module.exports.selectmenu = async function(){
	dsloaisp=await bangdanhmuc.select()
	var kq="";
	for(i=0;i<dsloaisp.length;i++)
 		{
            kq=kq+"<a href='/"+dsloaisp[i].idCat+"' class='dropdown-item'>"+dsloaisp[i].nameCat+"</a>"                            
		}
    return kq;
}

module.exports.selectforAdmin = async function(){
	dsloaisp1 = await bangdanhmuc.select();
	var kq="<tbody>";
	for (i=0;i<dsloaisp1.length;i++){
        kq=kq+"<tr>"
        kq=kq+"<td>"+dsloaisp1[i].idCat+"</td>";
        kq=kq+"<td>"+dsloaisp1[i].nameCat+"</td>";
        kq=kq+"<td><button onclick='capnhap("+dsloaisp1[i].idCat+")'><i class='fa fa-pencil'></i></button></td>";
        kq=kq+"<td><button onclick='xoa("+dsloaisp1[i].idCat+")'><i class='fa fa-trash'></i></button></td>";
        kq=kq+"</tr>";
                                         
	}
    kq+="</tbody>";
	return kq;
}
module.exports.selectforcapnhap = async function(maloai){
	dsloaisp = await bangdanhmuc.selectcapnhap({idCat:maloai})
	var kq="<form action='/capnhaploaisp/"+maloai+"' method='post'  name='frmcaphatloaisp'>";
    kq = kq+ "<div class='row'>";
    kq = kq+"<div class='col-md-12'>";
    kq = kq+"<label>Tên loại sản phẩm<span>*</span></label>";
    kq = kq+"<input type='text' value='"+dsloaisp[0].nameCat+"'name='ten_loaisp' id='ten_loaisp'>"
    kq = kq+ "</div>";
    kq = kq +"<div class='col-md-12'>";
    kq = kq +"<button type='submit'>Cập nhật</button>";
    kq = kq +"<br><br>";
    kq = kq+ "</div>";
    kq = kq +"</div>";
	return kq;
}
module.exports.delete = async function(maloai){
	del = await bangdanhmuc.delete({idCat:maloai});
	return "";
}
module.exports.insert = async function(newloai){
    createdloai = await bangdanhmuc.insert(newloai);
    return createdloai;
}
module.exports.update=async function(idCat,nameCat){
    var dm= await bangdanhmuc.update({idCat:idCat},nameCat);
    return dm;
}
module.exports.selectCombobox = async function(){
    dsloaisp=await bangdanhmuc.select()
	var kq="<select name='loai_sp' id='loai_sp'>";
    for (i=0;i<dsloaisp.length;i++){
        kq = kq +  "<option value='"+dsloaisp[i].idCat+"'>"+dsloaisp[i].nameCat+"</option>";
    }
    kq= kq+"</select>";
    return kq;
}


