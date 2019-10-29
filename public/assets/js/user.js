// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
    var formData = $(this).serialize()
    // 向服务端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新页面
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    })
   
    console.log(formData);
    
    // 阻止表单的默认提交行为
    return false
})
// 当用户选择文件的时候
$('#avatar').on('change', function () {
    // this.files[0]
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            // 实现头像预览功能
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
            
        }
    })
    
})

// 向服务器端发送请求  索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response);
        var html = template('userTpl', { data: response })
        console.log(html);
        
        
    }
})