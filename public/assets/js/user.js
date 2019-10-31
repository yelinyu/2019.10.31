// 当表单发生提交行为的时候(添加用户功能)
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
// 当用户选择文件的时候(上传用户图像)
$('#modifyBox').on('change', '#avatar', function () {
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
// 向服务器端发送请求  索要用户列表数据(获取用户列表)
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response);
        var html = template('userTpl', { data: response })
        // console.log(html);
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html)

    }
}) 

// 通过事件委托的方式编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    // 获取被点击用户id值
    var id = $(this).attr('data-id')
    // 根据id获取用户详细信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        // 模板字符串拼接
        // url: `/users/${id}`,
        success: function (response) {
            console.log(response);
           var html = template('modifyTpl', response)
           $('#modifyBox').html(html)
           
            
        }
    })
    
})

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize()
    // 获取要修改的那个用户id的值
    var id = $(this).attr('data-id')
    // 发送请求  修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            // 修改用户信息成功   重新加载页面
            location.reload()
            

        }
    })
    // 阻止表单默认提交
    return false


})