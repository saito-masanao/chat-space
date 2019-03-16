class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  #画像データがない時だけテキスト内容があるかどうか判別
  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
