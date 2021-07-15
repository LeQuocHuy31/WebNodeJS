var bangsanpham=require('../models/Product');
var bangdanhmuc = require('../models/Loaisp');
module.exports.select= async function (maloai)
{
    if(maloai==""){
        dssanpham= await bangsanpham.selectAll();
    }else{
	    dssanpham= await bangsanpham.select({idCat:maloai});
    }
	//dssanpham=await csdl.DocBang(query);
	var kq="";
	for(i=0;i<dssanpham.length;i++)
	 {
       kq=kq+"<div class='col-lg-4'>"
        +"<div class='product-item'>"
           + "<div class='product-image'>"
               +"<a href='/detail/"+dssanpham[i].idProduct+"'>"
                    +"<img src='../img/"+dssanpham[i].imgProduct+"' alt='Product Image'>"
                +"</a>"
                +"<div class='product-action'>"
                    +"<a href='/mua/"+dssanpham[i].idProduct+"'><i class='fa fa-cart-plus'></i></a>"
                    +"<a href='#'><i class='fa fa-heart'></i></a>"
                    +"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
            +"</div>"
            +"<div class='product-content'>"
               +"<div class='title'><a href='/detail/"+dssanpham[i].idProduct+"'>"+dssanpham[i].nameProduct+"</a></div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+dssanpham[i].priceProduct+"đ</div>"
               +"</div>"
            +"</div>"
        +"</div>"
	}
		 
	return kq;
}

//xem thông tin chi tiết sản phẩm
module.exports.selectChitiet= async function (masp)
{
    chitietsp=await bangsanpham.select({idProduct:masp})
	var kq=" ";
	for(i=0;i<chitietsp.length;i++)
	 {
		  
        kq=kq+"<div class='row align-items-center product-detail-top'>"
                +"<div class='col-md-5'>"
                    +"<div class='product-image'>"
                     +"<a href='/detail/"+chitietsp[i].idProduct+"'>"
                        +"<img src='../img/"+chitietsp[i].imgProduct+"' alt='Product Image'>"
                      +"</a>"
                    +"</div>"
                 +"</div>"
                +"<div class='col-md-7'>"
            +"<div class='product-content'>"
            +"<div class='title'>"+chitietsp[i].nameProduct+"</div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+chitietsp[i].priceProduct+"đ</div>"
                +"<div class='details'>"
                    +"<p>"+chitietsp[i].desProduct+"</p>"
                +"</div>"
                //+"<form name='form1' method='post' action='/capnhapgiohang'>"
                +"<div class='quantity'>"
                    +"<h4>Quantity:</h4>"
                        +"<button  onclick=tru()><i class='fa fa-minus'></i></button>"
                        +"<input type='text' value='1' id='soluong' name='soluong'>"
                        //+"<input type='text' value='0' name='txtsl"+chitietsp[i].idProduct+"'/>";
                        +"<button  onclick=cong()><i class='fa fa-plus'></i></button>"
                +"</div>"
                +"<div class='action'>"
                    //+"<a href='/mua/"+dssanpham[i].idProduct+"'><i class='fa fa-cart-plus'></i></a>"
                    //+"<button><a href='/mua/"+masp+"'>Thêm vào giỏ hàng</a></button>"
                    +"<button onclick=Themgiohang("+chitietsp[i].idProduct+")>Thêm vào giỏ hàng</button>"
                    //+"<a href='#'><i class='fa fa-heart'></i></a>"
                    //+"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
               // +"</form>"
              +"</div>"
            +"</div>"
        +"</div>"
			 break;  			   
	}		 
	return kq;
}

//Mô tả sản phẩm
module.exports.mota=async function(masp){
    chitietsp=await bangsanpham.select({idProduct:masp})
	var kq=" ";
	for(i=0;i<chitietsp.length;i++)
	{
	    kq=kq+"<p>"+chitietsp[i].desProduct+"</p>";
		break;  			   
	}		 
	return kq;

}

//danh sách các sản phẩm có liên quan với sản phẩm chi tiết
module.exports.selectsplienquan= async function (masp)
{
	/*var query='SELECT * FROM product WHERE idProduct='+masp;
	chitietsp=await csdl.DocBang(query);
     
    var query2='SELECT * FROM product WHERE idCat='+chitietsp[0].idCat
    dssanpham=await csdl.DocBang(query2);*/
    chitietsp=await bangsanpham.select({idProduct:masp});
    dssanpham=await bangsanpham.select({idCat:chitietsp[0].idCat})
	var kq=" ";
	for(i=0;i<dssanpham.length;i++)
	 {
		  
    kq=kq+ "<div class='col-lg-3'>"
        +"<div class='product-item'>"
           + "<div class='product-image'>"
                +"<a href='/detail/"+dssanpham[i].idProduct+"'>"
                    +"<img src='../img/"+dssanpham[i].imgProduct+"'alt='Product Image'>"
                +"</a>"
                +"<div class='product-action'>"
                    +"<a href='/mua/"+dssanpham[i].idProduct+"'><i class='fa fa-cart-plus'></i></a>"
                    +"<a href='#'><i class='fa fa-heart'></i></a>"
                    +"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
            +"</div>"
            +"<div class='product-content'>"
                +"<div class='title'><a href='/detail/"+dssanpham[i].idProduct+"'>"+dssanpham[i].nameProduct+"</a></div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+dssanpham[i].priceProduct+"</div>"
            +"</div>"
        +"</div>"
    +"</div>"  
	}		 
	return kq;
}

//danh sách sản phẩm nổi bật
module.exports.selectsanphamnoibat= async function ()
{
    
    /*var query='SELECT * from product';
	dssanpham=await csdl.DocBang(query);*/
    dssanpham=await bangsanpham.selectAll();
	var kq="";
	for(i=0;i<dssanpham.length;i++)
	 {
       kq=kq+ "<div class='col-lg-3'>"
        +"<div class='product-item'>"
            +"<div class='product-image'>"
                +"<a href='/detail/"+dssanpham[i].idProduct+"'>"
                +"<img src='../img/"+dssanpham[i].imgProduct+"' alt='Product Image'>"
                +"</a>"
                +"<div class='product-action'>"
                    +"<a href='/mua/"+dssanpham[i].idProduct+"'><i class='fa fa-cart-plus'></i></a>"
                    +"<a href='#'><i class='fa fa-heart'></i></a>"
                    +"<a href='#'><i class='fa fa-search'></i></a>"
                +"</div>"
            +"</div>"
            +"<div class='product-content'>"
                +"<div class='title'><a  href='/detail/"+dssanpham[i].idProduct+"'>"+dssanpham[i].nameProduct+"</a></div>"
                +"<div class='ratting'>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                    +"<i class='fa fa-star'></i>"
                +"</div>"
                +"<div class='price'>"+dssanpham[i].priceProduct+"đ</div>"
            +"</div>"
        +"</div>"
    +"</div>"
	}		 
	return kq;
}

module.exports.timKiem= async function (tensanpham)
	{
		/*var query="SELECT * from product where nameProduct like'%"+tensanpham +"%'";
        dstimkiem=await csdl.DocBang(query);*/
        var dstimkiem= await bangsanpham.select({$or:[{nameProduct: new RegExp(tensanpham,'i')},{desProduct: new RegExp(tensanpham,'i')}]});
        var kq="";
        for(i=0;i<dstimkiem.length;i++)
         {
           kq=kq+"<div class='col-lg-4'>"
            +"<div class='product-item'>"
               + "<div class='product-image'>"
                   +"<a href='/detail/"+dstimkiem[i].idProduct+"'>"
                        +"<img src='../img/"+dstimkiem[i].imgProduct+"' alt='Product Image'>"
                    +"</a>"
                    +"<div class='product-action'>"
                        +"<a href='/mua/"+dssanpham[i].idProduct+"'><i class='fa fa-cart-plus'></i></a>"
                        +"<a href='#'><i class='fa fa-heart'></i></a>"
                        +"<a href='#'><i class='fa fa-search'></i></a>"
                    +"</div>"
                +"</div>"
                +"<div class='product-content'>"
                   +"<div class='title'><a href='/detail/"+dstimkiem[i].idProduct+"'>"+dstimkiem[i].nameProduct+"</a></div>"
                    +"<div class='ratting'>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                        +"<i class='fa fa-star'></i>"
                    +"</div>"
                    +"<div class='price'>"+dstimkiem[i].priceProduct+"đ</div>"
                   +"</div>"
                +"</div>"
            +"</div>"
        }        
        return kq;
	}

module.exports.selectByCode = async function (masanpham){
    dssp = await bangsanpham.select({idProduct:masanpham})
    if (dssp.length>0)
	return dssp[0];
	return '';
}   

module.exports.selectforadmin = async function(){
    dssanpham= await bangsanpham.selectAll();
    var kq="<tbody>";
    for (i=0;i<dssanpham.length;i++){
        kq=kq+"<tr>";
        kq=kq+"<td>"+dssanpham[i].idProduct+"</td>";
        kq=kq+"<td>"+dssanpham[i].nameProduct+"</td>";
        kq=kq+"<td>"+dssanpham[i].priceProduct+"</td>";
        kq=kq+"<td><img src='../img/"+dssanpham[i].imgProduct+"' height='80px' weight='80px'></td>";
        kq=kq+"<td>"+dssanpham[i].idCat+"</td>";
        kq=kq+"<td><button onclick='capnhatsp("+dssanpham[i].idProduct+")'><i class='fa fa-pencil'></i></button><button style='margin-left: 10px;' onclick='xoa("+dssanpham[i].idProduct+")'><i class='fa fa-trash'></i></button></td>";
        kq=kq+"</tr>";
    }
    kq = kq +"</tbody>";
    return kq;
}
module.exports.selectforcapnhap = async function (masanpham){
    dssanpham =  await bangsanpham.select({idProduct:masanpham});
    dsloaisp=await bangdanhmuc.select();
    var cb="<select name='loai_sp' id='loai_sp'>";
    for (i=0;i<dsloaisp.length;i++){
    if (dsloaisp[i].idCat==dssanpham[0].idCat)
        cb = cb +  "<option value='"+dsloaisp[i].idCat+"' selected>"+dsloaisp[i].nameCat+"</option>";
        else
        cb = cb +  "<option value='"+dsloaisp[i].idCat+"'>"+dsloaisp[i].nameCat+"</option>";
    }
    cb= cb+"</select>";

    var kq= "<form action='/capnhapsanpham/"+masanpham+"' method='post' name='frmcapnhatsp' enctype='multipart/form-data'>";
    kq = kq + "<div class='row'>"
    kq = kq +"<div class='col-md-6'>"
    kq=  kq+ "<label>Tên sản phẩm<span>*</span></label>"
    kq = kq + "<input type='text' value='"+dssanpham[0].nameProduct+"' name='ten_sp' id='ten_sp'>";
    kq = kq+"</div>";
    kq = kq +"<div class='col-md-6'>";
    kq = kq+"<label>Đơn giá<span>*</span></label>";
    kq = kq+"<input type='text' value='"+dssanpham[0].priceProduct+"' name='don_gia' id='don_gia'>";
    kq = kq+"</div>";
    kq = kq +"<div class='col-md-6'>";
    kq = kq +"<label>Hình sản phẩm<span>*</span></label>";
    kq = kq+"<input type='file' value='../img/"+dssanpham[0].imgProduct+"' name='hinh_sp' id='hinh_sp' accept='.png, .jpeg, .jpg'>";
    kq = kq+"</div>";
    kq = kq +"<div class='col-md-6'>";
    kq = kq+"<label>Loại sản phẩm<span>*</span></label></br>";
    kq = kq + cb;
    kq = kq+"</div>";
    kq = kq +"<div class='col-md-12'>";
    kq = kq +"<label>Mô tả<span>*</span></label>";
    kq = kq +"<input type='text' value='"+dssanpham[0].desProduct+"' name='mo_ta' id='mo_ta'>";
    kq = kq +"</div>";
    kq = kq +"<div class='col-md-12'>";
    kq = kq +"<button type='submit'>Cập nhập</button>";
    kq = kq +"<br><br>";
    kq = kq+"</div>";
    kq = kq+"</div>";
    return kq;
}
module.exports.delete = async function(maloai){
	del = await bangsanpham.delete({idProduct:maloai});
	return "";
}
module.exports.insert = async function(newsanpham){
    created = await bangsanpham.insert(newsanpham);
    return created;
}
module.exports.update = async function(idProduct1,idCat,nameProduct,priceProduct,imgProduct,desProduct){
    var sp = await bangsanpham.update({idProduct:idProduct1},idCat,nameProduct,priceProduct,imgProduct,desProduct);
    return sp;
}
