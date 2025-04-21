const base_url = "http://localhost:"

const services_dns = {
    "authentication": "5000"
}

export const authentication_url = new URL(base_url + services_dns.authentication + "/api/")
