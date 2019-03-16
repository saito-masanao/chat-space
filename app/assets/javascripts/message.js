$(function(){
  function buildHTML(message){
    var html =`<div class = "message">
                 <div class = "upper-message">
                   <div class = "upper-message__user-name">
                     ${message.user_name}
                   </div>
                   <div class = "upper-message__date">
                     ${message.created_time}
                   </div>
                 </div>
                <div class = "lower-message">`

    var html_text_img =`
        <p class = "lower-message__content">
          ${message.text}
        </p>
        <img src = "${message.image_url}", class = "lower-message__image">
      </div>
    </div>`

    var html_text =`
        <p class = "lower-message__content">
          ${message.text}
        </p>
      </div>
    </div>`

    var html_img =`
        <img src = "${message.image_url}", class = "lower-message__image">
      </div>
    </div>`

    if(message.text !== "" && message.image_url == null) {
      return (html + html_text);
    } else if(message.text == "" && message.image_url !== null) {
      return (html + html_img);
    } else {
      return (html + html_text_img);
    }
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
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, "slow", "swing");
    })
    .fail(function(){
      alert('error');
    })
  })
})
