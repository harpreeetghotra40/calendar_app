Rails.application.routes.draw do
  get "/users/:id", to: "users#show"

  get "/calendars/:id" => "calendars#show"

  #events routes
  get "/events" => "events#index"
  post "/events" => "events#create"
  patch "/events" => "events#update"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
