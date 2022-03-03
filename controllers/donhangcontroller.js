var bangdonhang = require('../models/Donhang');
var bangsanpham = require('../models/Product')

module.exports.select = async function(ten){
    var dsdonhang = await bangdonhang.select({hoten:ten});
    var kq="";
    for(i=0;i<dsdonhang.length;i++){
        var tong=0;
        var dssp=dsdonhang[i].dsmh;
        for(j=0;j<dssp.length;j++){
           
            tong=tong+dssp[j].thanhtien;
        }
        kq=kq +"<tr>"
                +"<td>"+dsdonhang[i].sodh+"</td>"
                +"<td>"+dsdonhang[i].ngaymua+"</td>"
                +"<td>"+tong+"đ</td>"
                +"<td>"+dsdonhang[i].trangthai+"</td>"
                
                if(dsdonhang[i].trangthai != 'Đang xử lí'){
                kq=kq+"<td><a href='/ttdonhang/"+dsdonhang[i].sodh+"'><button>Chi tiết</button></a></td>"
               
                }else{
                kq=kq+"<td><button onclick='huydonhang("+dsdonhang[i].sodh+")'>Hủy</button><button style='margin-left: 10px;' onclick='xemdonhang("+dsdonhang[i].sodh+")'>Chi tiết</button></td>";
                
                }
            +"</tr>"
    }
   // console.log(kq);
    return kq;
}

module.exports.selectchitietdonhang = async function(madh){
    var dsdonhang = await bangdonhang.select({sodh:madh});

    var dsmh=dsdonhang[0].dsmh;
    
    var kq="";
    for(i=0;i<dsmh.length;i++){
        var sp = await bangsanpham.select({idProduct:dsmh[i].ma})
        var gia =sp[0].priceProduct;
        kq=kq +"<tr>"
                +"<td>"+(i+1)+"</td>"
                +"<td>"+dsmh[i].ma+"</td>"
                +"<td>"+dsmh[i].tensanpham+"</td>"
                +"<td>"+dsmh[i].soluong+"</td>"
                +"<td>"+gia+"đ</td>"
                +"<td>"+dsmh[i].thanhtien+"đ</td>"
            +"</tr>"
    
    }
    return kq;
}

module.exports.chitietdonhang = async function(madh){
    var dsdonhang = await bangdonhang.select({sodh:madh});
    var dsmh=dsdonhang[0].dsmh;
    var tong=0;
    var kq="";
    for(i=0;i<dsmh.length;i++){
        kq=kq + "<p class='ship-cost'>"+dsmh[i].tensanpham +" x <b>"+ dsmh[i].soluong+"</b><span>"+dsmh[i].thanhtien+"đ</span></p>"
        tong= tong + dsmh[i].thanhtien;
    }
    kq=kq+ "<h4>Tổng <span>"+tong+"đ</span></h4>"
    return kq;
}


module.exports.donhang = async function(madh){
    var dsdonhang = await bangdonhang.select({sodh:madh});
    var dsmh=dsdonhang[0].dsmh;
    var tong=0;
    var kq="";
    for(i=0;i<dsmh.length;i++){
        tong= tong + dsmh[i].thanhtien;
    }
    kq=kq+"<p>Mã đơn hàng: <b>"+dsdonhang[0].sodh+"</b></p>"
         +"<p>Ngày: <b>"+dsdonhang[0].ngaymua+"</b></p>"
         +"<p>Tổng tiền: <b>"+tong+"đ</b></p>"
    return kq;
}

module.exports.selectmadh = async function(){
   var l= await bangdonhang.dodai();
   return l;
}

module.exports.insert = async function(dh){
    createdh = await bangdonhang.insert(dh);
    return createdh;
}

module.exports.selectforAdmin = async function(){
    var dsdonhang = await bangdonhang.selectAll();
    var kq="<tbody>";
    for (i=0;i<dsdonhang.length;i++){
        kq=kq+"<tr>";
        kq=kq+"<td>"+dsdonhang[i].sodh+"</td>";
        kq=kq+"<td>"+dsdonhang[i].hoten+"</td>";
        kq=kq+"<td>"+dsdonhang[i].ngaymua+"</td>";
        var tong = 0;
        for (j=0;j<dsdonhang[i].dsmh.length;j++)
            tong+=dsdonhang[i].dsmh[j].thanhtien*1;
        kq=kq+"<td>"+tong+"</td>";
    
        kq=kq+"<td>"+dsdonhang[i].trangthai+"</td>";
       // kq=kq+"<td><button onclick='xemdonhang("+dsdonhang[i].sodh+")'>Xem</button></td>";
       kq=kq+"<td><button onclick='capnhapdonhang("+dsdonhang[i].sodh+")'><i class='fa fa-pencil'></i></button><button style='margin-left: 10px;' onclick='xemdonhang("+dsdonhang[i].sodh+")'>Xem</button></td>";
       kq=kq+"</tr>";
    }
    kq=kq+"</tbody>";
    return kq;
}

module.exports.selectforupdate = async function(madh){
    var cb="<select name='trang_thai' id='trang_thai' style=' height: 30px;width:300px'>";
    cb = cb +  "<option value='Đang xử lí' selected>Đang xử lí</option>";
    cb = cb +  "<option value='Đang vận chuyển'>Đang vận chuyển</option>";
    cb = cb +  "<option value='Đã giao'>Đã giao</option>";
    cb= cb+"</select>";
    var kq= "<form action='/capnhapdonhang/"+madh+"' method='post' name='frmcapnhatdonhang' enctype='multipart/form-data'>";
    kq = kq +"<div class='col-md-6'>";
    kq = kq+"<label>Trạng thái đơn hàng<span>*</span></label></br>";
    kq = kq + cb;
    kq = kq+"</div><br>";
    kq = kq +"<div class='col-md-12'>";
    kq = kq +"<button type='submit'>Cập nhập</button>";
    kq = kq +"<br><br>";
    kq = kq+"</div>";
    kq = kq+"</div>";
    return kq;
}

module.exports.delete = async function(madh){
	del = await bangdonhang.delete({sodh:madh});
	return "";
}

module.exports.tongquan = async function(){
    var dsdonhang = await bangdonhang.selectAll();
    var tong = 0;
    for (i=0;i<dsdonhang.length;i++){
        for (j=0;j<dsdonhang[i].dsmh.length;j++)
        tong+=dsdonhang[i].dsmh[j].thanhtien*1;
    }
    var kq = "<div><p>Số đơn hàng: <b>"+ dsdonhang.length + "</b>. Tổng doanh thu: <b>" + tong +" VND</b></p>";
    return kq;
}
module.exports.selectdetail = async function(sodh){
    var dsdonhang = await bangdonhang.select({sodh:sodh});
    kq = "<p>Số hóa đơn: " + sodh + "</p>";
    kq = kq +"<p>Tên khách hàng: "+ dsdonhang[0].hoten + "</p>";
    kq = kq +"<p>Địa chỉ: "+ dsdonhang[0].diachi + "</p>";
    kq = kq +"<p>Địa chỉ: "+ dsdonhang[0].ngaymua + "</p>";
    kq = kq +"<p>Điện thoại: "+ dsdonhang[0].dienthoai + "</p>";
    kq = kq +"<p>Email: "+ dsdonhang[0].email + "</p>";
    kq = kq +"<table class='table table-bordered'>";
    kq = kq + "<thead class='thead-dark'>";
    kq = kq+"<tr>";
    kq = kq+"<th>STT</th>";
    kq = kq+"<th>Tên sản phẩm</th>";
    kq = kq+"<th>Số lượng</th>";
    kq = kq+ "<th>Thành tiền</th>";
    kq = kq +"</tr>";
    kq = kq+ "</thead>"
    var tongtien = 0;
    for (i=0;i<dsdonhang[0].dsmh.length;i++){
        kq=kq+"<tr>";
        kq=kq+"<td>"+(i+1)+"</td>";
        kq=kq+"<td>"+dsdonhang[0].dsmh[i].tensanpham+"</td>";
        kq=kq+"<td>"+dsdonhang[0].dsmh[i].soluong+"</td>";
        kq=kq+"<td>"+dsdonhang[0].dsmh[i].thanhtien+"</td>";
        kq=kq+"</tr>";
        tongtien += dsdonhang[0].dsmh[i].thanhtien;
    }                                
    kq = kq +"</table>";
    kq = kq + "<p><b>Tổng tiền:</b> "+tongtien+" VND</p>";
    return kq;
}

module.exports.update=async function(dh,trangthai){
    var tt= await bangdonhang.update({sodh:dh},trangthai);
    return tt;
}