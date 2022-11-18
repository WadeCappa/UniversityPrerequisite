defmodule BackendWeb.Auth do
  use BackendWeb, :controller

  @signing_salt "tgTo3xGUF0jJQINsACpK0RIjPt8ioznSgFwZW5GT"
  @token_age_secs 14 * 86_400

  def signIn(conn, %{"email" => email, "password" => password} = _params) do
    # First check if user exists
      # if user exists get user data (including unqiue ID), then generate and return token
      # else return error
    case BackendWeb.DatabaseManager.runCypher(
      "MATCH (u:User{email:'#{email}'}) return u.password as password, ID(u) as id"
    ) do
      [%{"id" => userID, "password" => oldPassword} | _] -> if Bcrypt.verify_pass(password, oldPassword) do
        json conn, %{jwt: generateJWT(userID)}
      else
        json conn, %{error: "No matching credentials"}
      end
      %{code: error_code, message: error_message} -> json conn, %{code: error_code, message: error_message}
      [] -> json conn, %{error: "No matching credentials"}
    end
  end

  def createAccount(conn, %{"email" => email, "password" => password} = _params) do
    res = case BackendWeb.DatabaseManager.runCypher(
      "CREATE (u:User {email:'#{email}', password:'#{hashPassword(password)}'}) return ID(u) as id"
    ) do
      %{code: error_code, message: error_message} -> json conn, %{code: error_code, message: error_message}
      [res | _] -> json conn, %{jwt: generateJWT(res)}
      [] -> json conn, %{error: "No matching credentials"}
    end
    # try to create account (password must be hashed, research if you should has in frontend or backend)
      # if failed then email is not unique, return response
      # else create user in database, run data through sign in
  end

  def validateJWT_DEBUG(conn, %{"JWT" => jwt} = _params) do
    {:ok, code} = validateJWT(jwt)
    json conn, code
  end


  defp hashPassword(password) do
    %{:password_hash => hash} = Bcrypt.add_hash(password)
    hash
  end

  defp generateJWT(userID) do
    Phoenix.Token.sign(BackendWeb.Endpoint, @signing_salt, userID)
  end

  defp validateJWT(token) do
    Phoenix.Token.verify(BackendWeb.Endpoint, @signing_salt, token, max_age: @token_age_secs)
  end

end