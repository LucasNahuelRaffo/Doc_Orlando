const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Configuración de la Service Account (Usar variables de entorno)
const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// ID de tu hoja: 1AoUiTBZxQR5Uae1A22fhTuQybEZO9qkPvlWtE3dbjF4
const doc = new GoogleSpreadsheet('1AoUiTBZxQR5Uae1A22fhTuQybEZO9qkPvlWtE3dbjF4', serviceAccountAuth);

module.exports = async (req, res) => {
    // Manejo de CORS manual para permitir peticiones desde tu frontend
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        return res.status(200).send('Backend de Orlando está funcionando correctamente. Usa POST en /api/submit para enviar datos.');
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await doc.loadInfo();

        // Buscar la hoja "Hoja 1" o usar la primera disponible
        let sheet = doc.sheetsByTitle['Hoja 1'];
        if (!sheet) {
            sheet = doc.sheetsByIndex[0];
        }

        // Intentar cargar cabeceras. Si falla o no hay, las creamos.
        try {
            await sheet.loadHeaderRow();
        } catch (e) {
            // Si no hay cabeceras, las definimos
            await sheet.setHeaderRow(['Fecha', 'Nombre', 'Email', 'Telefono', 'Procedimiento', 'Otro', 'FechaCita', 'HoraCita', 'Cirugias', 'Condicion', 'DetalleCondicion', 'Mensaje']);
        }

        const data = req.body;

        // Validar que los datos existan
        if (!data || !data.nombreCompleto) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        await sheet.addRow({
            Fecha: new Date().toLocaleString('es-ES', { timeZone: 'America/Guayaquil' }),
            Nombre: data.nombreCompleto,
            Email: data.email,
            Telefono: `'${data.codigoArea} ${data.telefono}`,
            Procedimiento: data.procedimiento,
            Otro: data.procedimientoOtro || 'N/A',
            FechaCita: data.fechaCita,
            HoraCita: data.horaCita,
            Cirugias: data.cirugiasAnteriores,
            Condicion: data.condicionMedica,
            DetalleCondicion: data.condicionMedicaTipo || 'N/A',
            Mensaje: data.mensajeAdicional || 'N/A'
        });

        return res.status(200).json({ success: true, message: 'Datos guardados correctamente' });
    } catch (error) {
        console.error('Error en el backend:', error);
        return res.status(500).json({
            error: 'Error al guardar en Sheets',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
