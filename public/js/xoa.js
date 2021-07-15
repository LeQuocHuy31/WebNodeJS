function Xoa(ten){
    if (confirm('Bạn có muốn xóa sản phẩm này không?')){
      window.location="/xoasanpham/"+ten;
    }
    console.log(ten);
}