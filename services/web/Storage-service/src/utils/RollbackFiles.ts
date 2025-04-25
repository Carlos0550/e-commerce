import path from "path"
import fs from "fs/promises"

export const rollbackFiles = async (paths: string[]) => {
    console.log("Comenzando proceso de rollback de imagenes...")
  try {
    for (const fileName of paths) {
      setTimeout(async()=> await fs.unlink(path.join(__dirname,"../uploads", fileName)), 1000)
    }
    console.log("Rollback de imagenes finalizado")
  } catch (error) {
    console.log("Error al hacer rollback de los archivos", error);
  }
};
