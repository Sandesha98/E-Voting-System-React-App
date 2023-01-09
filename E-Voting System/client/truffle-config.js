module.exports = {
  rpc: {
    host: "127.0.0.1",
    port: 8081
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8081,
      network_id: "1999",
      from: "0x6e224ef9976b43cc09c30d6b751f2f45e1e52bbf",
      gas: 1000000
    },
  }
}