# Homepage (Root path)


get "/" do
  client = Instagram.client(:access_token => session[:access_token])
  @links = []
  for media_item in client.media_popular
    @links << media_item.images.thumbnail.url
  end
  gon.links = @links[0..7]
  erb :index

end

get "/:tag" do
  client = Instagram.client(:access_token => session[:access_token])
  @links = []
  tags = client.tag_search("#{params[:tag]}")
  if tags.length > 0
    for media_item in client.tag_recent_media(tags[0].name)
      @links << media_item.images.thumbnail.url
    end
    unless @links.length > 7
      redirect "/"
    end
  else
    redirect "/"
  end
  gon.links = @links[0..7]
  erb :index
end
