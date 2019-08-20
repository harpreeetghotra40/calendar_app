# frozen_string_literal: true

Rails.application.routes.draw do
  post "/users", to: "users#create"
  post "/login", to: "auth#create"

  get "/users/:id", to: "users#show"

  get "/calendars/:id" => "calendars#show"

  #events routes
  get "/events" => "events#index"
  post "/events" => "events#create"
  patch "/events" => "events#update"
  delete "/events" => "events#delete"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
