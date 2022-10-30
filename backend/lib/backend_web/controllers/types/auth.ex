defmodule BackendWeb.Auth do
  use BackendWeb, :controller

  @signing_salt "tgTo3xGUF0jJQINsACpK0RIjPt8ioznSgFwZW5GT"
  @token_age_secs 14 * 86_400

  def signIn(conn, %{"email" => email, "password" => password} = _params) do
    # First check if user exists
      # if user exists get user data (including unqiue ID), then generate and return token
      # else return error
  end

  def createAccount(conn, %{"email" => email, "password" => password} = _params) do
    # try to create account (password must be hashed, research if you should has in frontend or backend)
      # if failed then email is not unique, return response
      # else create user in database, run data through sign in
  end

  def generateJWT(userID) do
    Phoenix.Token.sign(BackendWeb.Endpoint, @signing_salt, userID)
  end

  def validateJWT(token) do
    Phoenix.Token.verify(BackendWeb.Endpoint, @signing_salt, token, max_age: @token_age_secs)
  end

end
