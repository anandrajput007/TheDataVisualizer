const PROXY_CONFIG = [
  {
    context: [
      "/",
    ],
    target: "https://localhost:7282",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
