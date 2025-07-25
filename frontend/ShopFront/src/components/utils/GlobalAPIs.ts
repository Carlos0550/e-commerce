const isProduction = true
const BASE_URL_DEV = "http://localhost"
type ServiceConfig = {
  port: string
  path: string
  prodUrl?: string 
}

const services: Record<string, ServiceConfig> = {
  authentication: {
    port: "5000",
    path: "/api/",
    prodUrl: "https://e-commerce-development.up.railway.app", 
  },
  products:{
    port: "5001",
    path: "/api/",
    prodUrl: "https://products-service-development.up.railway.app"
  },
  categories:{
    port: "5001",
    path: "/api/categories",
    prodUrl: "https://products-service-development.up.railway.app"
  },
  ssr:{
    port:"5002",
    path:"/api/",
    prodUrl: "https://ssr-service-development.up.railway.app"
  }
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
