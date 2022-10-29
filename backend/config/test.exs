import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :backend, BackendWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "zsuPBk7AcPS7HpPm+fIoquXFmaiXzGKxvYurszRPqoxJR274zccphAG2t3PhLX5M",
  server: false

# In test we don't send emails.
config :backend, Backend.Mailer,
  adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
