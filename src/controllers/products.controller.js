import { getConnection, sql } from "../database/connection";

export const updateProductById = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { name, description, price, stock } = req.body;

        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, id)
            .input('Name', sql.NVarChar, name)
            .input('Description', sql.NVarChar, description)
            .input('Price', sql.Decimal(10, 2), price)
            .input('Stock', sql.Int, stock)
            .execute('dbo.UpdateProduct');  // Nombre del procedimiento almacenado

        res.status(200).send(`Producto con ID ${id} actualizado con éxito`);
    } catch (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).send('Error al actualizar el producto');
    }
};

export const deleteProductById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, id)
            .execute('dbo.DeleteProduct');  // Nombre del procedimiento almacenado

        res.status(200).send(`Producto con ID ${id} eliminado con éxito`);
    } catch (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).send('Error al eliminar el producto');
    }
};