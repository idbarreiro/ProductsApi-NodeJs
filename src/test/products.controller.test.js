// Importamos las funciones del controlador
import { updateProductById, deleteProductById } from '../controllers/products.controller';

// Mock de la conexión a la base de datos
import { getConnection, sql } from '../database/connection';

// Mock de Jest para `getConnection`
jest.mock('../database/connection');

describe('Product Controller', () => {
    let req, res, mockRequest;

    beforeEach(() => {
        // Mock de req y res para simular la solicitud HTTP y la respuesta
        req = { params: { id: 1 }, body: { name: 'Producto Test', description: 'Descripción Test', price: 100, stock: 10 } };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Mock de la respuesta de `getConnection`
        mockRequest = {
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue({}),
        };
        getConnection.mockResolvedValue({ request: jest.fn().mockReturnValue(mockRequest) });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('updateProductById', () => {
        it('debería actualizar el producto correctamente', async () => {
            // Ejecutamos la función
            await updateProductById(req, res);

            // Verificamos que `input` haya sido llamado con los valores correctos
            expect(mockRequest.input).toHaveBeenCalledWith('Id', sql.Int, 1);
            expect(mockRequest.input).toHaveBeenCalledWith('Name', sql.NVarChar, 'Producto Test');
            expect(mockRequest.input).toHaveBeenCalledWith('Description', sql.NVarChar, 'Descripción Test');
            expect(mockRequest.input).toHaveBeenCalledWith('Price', sql.Decimal(10, 2), 100);
            expect(mockRequest.input).toHaveBeenCalledWith('Stock', sql.Int, 10);

            // Verificamos que se haya ejecutado el procedimiento almacenado correcto
            expect(mockRequest.execute).toHaveBeenCalledWith('dbo.UpdateProduct');

            // Verificamos que el estado y la respuesta hayan sido enviados correctamente
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Producto con ID 1 actualizado con éxito');
        });

        it('debería devolver un error si ocurre un problema al actualizar', async () => {
            // Simulamos que el procedimiento lanza un error
            mockRequest.execute.mockRejectedValue(new Error('Error al actualizar el producto'));

            // Ejecutamos la función
            await updateProductById(req, res);

            // Verificamos que el error haya sido capturado y manejado correctamente
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Error al actualizar el producto');
        });
    });

    describe('deleteProductById', () => {
        it('debería eliminar el producto correctamente', async () => {
            // Ejecutamos la función
            await deleteProductById(req, res);

            // Verificamos que `input` haya sido llamado con el valor correcto
            expect(mockRequest.input).toHaveBeenCalledWith('Id', sql.Int, 1);

            // Verificamos que se haya ejecutado el procedimiento almacenado correcto
            expect(mockRequest.execute).toHaveBeenCalledWith('dbo.DeleteProduct');

            // Verificamos que el estado y la respuesta hayan sido enviados correctamente
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Producto con ID 1 eliminado con éxito');
        });

        it('debería devolver un error si ocurre un problema al eliminar', async () => {
            // Simulamos que el procedimiento lanza un error
            mockRequest.execute.mockRejectedValue(new Error('Error al eliminar el producto'));

            // Ejecutamos la función
            await deleteProductById(req, res);

            // Verificamos que el error haya sido capturado y manejado correctamente
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Error al eliminar el producto');
        });
    });
});