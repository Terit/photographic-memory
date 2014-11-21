# Homepage (Root path)
get '/' do
  erb :index
end

get '/*' do
  redirect "/"
end
