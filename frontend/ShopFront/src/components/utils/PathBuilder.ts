import { getServiceUrl } from "./GlobalAPIs"

export const buildPath = (prPath: string) => {
    return `${getServiceUrl("products")}${prPath}`
}