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
                +"<td>"+tong+"</td>"
                +"<td>Đang xử lí</td>"
                +"<td><a href='/ttdonhang/"+dsdonhang[i].sodh+"'><button>Chi tiết</button></a></td>"
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
                +"<td>"+gia+"</td>"
                +"<td>"+dsmh[i].thanhtien+"</td>"
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
        kq=kq+"<td>"+dsdonhang[i].diachi+"</td>";
        kq=kq+"<td>"+dsdonhang[i].ngaymua+"</td>";
        var tong = 0;
        for (j=0;j<dsdonhang[i].dsmh.length;j++)
            tong+=dsdonhang[i].dsmh[j].thanhtien*1;
        kq=kq+"<td>"+tong+"</td>";
        kq=kq+"<td><button onclick='xemdonhang("+dsdonhang[i].sodh+")'>Xem</button></td>";
        kq=kq+"</tr>";
    }
    kq=kq+"</tbody>";
    return kq;
}
module.exports.tongquan = async function(){
    var dsdonhang = await bangdonhang.selectAll();
    var tong = 0;
    for (i=0;i<dsdonhang.length;i++){
        for (j=0;j<dsdonhang[i].dsmh.length;j++)
        tong+=dsdonhang[i].dsmh[j].thanhtien*1;
    }
    var kq = "<div><p>Số đơn hàng: "+ dsdonhang.length + ". Tổng doanh thu: " + tong +" VND</p>";
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
