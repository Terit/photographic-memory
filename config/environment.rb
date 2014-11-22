require 'rubygems'
require 'bundler/setup'

require 'active_support/all'

# Load Sinatra Framework (with AR)
require 'sinatra'
require 'sinatra/activerecord'

require 'pry'
require 'instagram'
require 'gon-sinatra'

APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))
APP_NAME = APP_ROOT.basename.to_s

# Sinatra configuration
configure do
  set :root, APP_ROOT.to_path
  set :server, :puma

  enable :sessions
  set :session_secret, ENV['SESSION_KEY'] || 'lighthouselabssecret'

  set :views, File.join(Sinatra::Application.root, "app", "views")
end

# Set up the database and models
require APP_ROOT.join('config', 'database')

# Load the routes / actions
require APP_ROOT.join('app', 'actions')

Instagram.configure do |config|
  config.client_id = "9da886f5f068407d9239abb2ae46cda2"
  config.client_secret = "ab530693873a4010bf5f9067ee775f3f"
  # For secured endpoints only
  #config.client_ips = '<Comma separated list of IPs>'
end

Sinatra::register Gon::Sinatra
