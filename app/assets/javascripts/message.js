$(function(){
  function buildHTML(message){
    var html = `<div class = "message">
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      $(message.user_name)
                    </div>
                    <div class = "upper-message__date">
                      $(message.created_time)
                    </div>
                  <div class = "lower-meesage">
                    <% if message.content.present? %>
                      <p class = "lower-message__content">
                        $(message.text)
                      </p>
                    <% end %>
                    <% if message.image.present? %>
                      <%= image_tag message.image.url, class: 'lower-message__image' %>
                    <% end %>
                  </div>`
    return html;
  }
  $('#form__message').on('submit', function(e){
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
    })
  })
})
