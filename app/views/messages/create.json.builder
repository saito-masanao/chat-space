json.user_name  @message.user.name
json.created_time  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.text  @message.content
ison.image_url  @message.image.url

