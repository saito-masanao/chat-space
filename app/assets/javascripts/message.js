$(function(){
  function buildHTML(message){
    var html = `<div class = "message">
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class = "upper-message__date">
                      ${message.created_time}
                    </div>
                  </div>
                  <div class = "lower-meesage">
                  </div>
                </div>`
    return html;
  }
  function buildHTML_message(message){
    var html =`<p class = "lower-message__content">
                ${message.text}
              </p>`
    return html;
  }
  function buildHTML_img(message){
    var html =`<img src = ${message.image_url}, class = 'lower-message__image' >`
    return html;
  }

  $('#form__message__img').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var html_message = buildHTML_message(data);
      var html_img = buildHTML_img(data);
      $('.messages').append(html)
      if( ${message.text} !== null){
        $('.lower-meesage').append(html_message)
      }
      if( ${message.image_url} !== null){
        $('.lower-meesage').append(html_img)
      }
      $('.form__message').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
})
