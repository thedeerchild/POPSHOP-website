require "bundler/capistrano"

#use local key for authentication
ssh_options[:forward_agent] = true
default_run_options[:pty] = true
set :user, "deployer"
set :use_sudo, false

set :application, "POPSHOP-Website"
set :repository,  "git@github.com:elm232/POPSHOP-website.git"

role :web, "162.243.40.58"
set :deploy_to, "/home/deployer/www/current"