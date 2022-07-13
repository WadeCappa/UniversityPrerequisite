defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/raw", ApiWeb do
    pipe_through :api

    scope "/simple" do
      get "/tasks/:org/", RawController, :simplifiedTasks
    end

    get "/tasks/:org/", RawController, :allOrgTasks
    get "/tasks/", RawController, :allTasks
    get "/objectives/:org/", RawController, :allOrgObjectives
    get "/task/:subject/:number/", RawController, :getTask
  end

  scope "/flow", ApiWeb do
    pipe_through :api

    get "/tasks/for/:objective/at/:organization", ObjectiveTasksController, :objectiveTasks
  end

end
