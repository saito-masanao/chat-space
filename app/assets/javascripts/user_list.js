$(function(){
  function appendUserNameHTML(user) {
    var user_name_html = `<div class="chat-group-user clearfix">
                            <p class="chat-group-user__name">${user.name}</p>
                            <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                          </div>`
    $("#user-search-result").append(user_name_html);
  }
  function appendErrMsgToHTML(message) {
    var error_message_html = `<div class="chat-group-user clearfix">
                                <p class="chat-group-user__name">${message}</p>
                              </div>`
    $("#user-search-result").append(error_message_html);
  }

  function appendGroupMemberHTML(name, id) {
    var group_member_html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                               <input name='group[user_ids][]' type='hidden' value='${id}'>
                               <p class='chat-group-user__name'>${name}</p>
                               <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                             </div>`
    $("#chat-group-users").append(group_member_html);
  }
  $('#user-search-field').on('keyup', function(){
    var form_input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: form_input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users);
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUserNameHTML(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました');
    })
  });

  $(document).on('click', '.chat-group-user__btn--add', function(){
    $(this).parent().remove();
    var name = $(this).data('user-name');
    var id = $(this).data('user-id');
    appendGroupMemberHTML(name, id);
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});
