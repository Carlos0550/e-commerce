const isProduction = true
console.log(isProduction)
const BASE_URL_DEV = "http://localhost"

// Aquí definís todos tus servicios
type ServiceConfig = {
  port: string
  path: string
  prodUrl?: string // opcional, por si ese microservicio está en un dominio aparte
}

const services: Record<string, ServiceConfig> = {
  authentication: {
    port: "5000",
    path: "/api/",
    prodUrl: "https://e-commerce-development.up.railway.app", 
  },
  
}

export const getServiceUrl = (service: keyof typeof services): string => {
    const { port, path, prodUrl } = services[service]
  
    if (isProduction) {
      return new URL(path, prodUrl).toString()
    } else {
      const url = new URL(BASE_URL_DEV)
      url.port = port
      url.pathname = path
      return url.toString()
    }
  }
