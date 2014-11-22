# Homepage (Root path)


# get '/' do
#   erb :index
# end

# get '/*' do
#   redirect "/"
# end

# get '/media_like/:id' do
#   client = Instagram.client(:access_token => session[:access_token])
#   client.like_media("#{params[:id]}")
#   # redirect "/user_recent_media"
#   erb :instadisplay
# end

# get "/media_search" do
#   client = Instagram.client(:access_token => session[:access_token])
#   html = "<h1>Get a list of media close to a given latitude and longitude</h1>"
#   for media_item in client.media_search("37.7808851","-122.3948632")
#     html << "<img src='#{media_item.images.thumbnail.url}'>"
#   end
#   html
# end

get "/" do
  client = Instagram.client(:access_token => session[:access_token])
  # html = "<h1>Get a list of the overall most popular media items</h1>"
  @links = []
  for media_item in client.media_popular
    @links << media_item.images.thumbnail.url
  end
  gon.links = @links[0..7]
  # gon.links[0..7]
  erb :index

end
