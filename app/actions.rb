get "/" do
  client = Instagram.client(:access_token => session[:access_token])
  @links = []
  for media_item in client.media_popular
    @links << media_item.images.thumbnail.url
  end
  gon.links = @links[0..7]
  erb :index
end

post '/leaderboard' do
  if params[:tag] == ''
    params[:tag] = 'popular'
  end
  Leader.create name: params[:name],hashtag: params[:tag],score: params[:score].to_i
  redirect '/leaderboard'
end

get '/leaderboard' do
  @tag = 'leaderboard'
  @leaders = Leader.all.order(score: :desc).limit(10)
  erb :leaderboard
end

get "/search" do
  if params[:search].match(/#/)
    params[:search] = params[:search].gsub(/#/,'')
  end
  redirect "/#{params[:search]}"
end

get "/:tag" do
  client = Instagram.client(:access_token => session[:access_token])
  @links = []
  tags = client.tag_search("#{params[:tag]}")
  if tags.length > 0
    @tag = params[:tag]
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
