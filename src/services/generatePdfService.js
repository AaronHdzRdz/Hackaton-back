import puppeteer from 'puppeteer';
import fs from 'fs';

export const generarPdfHistorial = async (mascota, historial) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const nombreArchivo = `historial_${mascota._id}_${Date.now()}.pdf`;
    const stream = fs.createWriteStream(`./pdfs/${nombreArchivo}`);
    doc.pipe(stream);

    // === ENCABEZADO ===
    doc.fontSize(22).text('HISTORIA CLINICA VETERINARIA', { align: 'center' });
    doc.fontSize(12).text('Nombre de la Institución: Clínica Veterinaria XYZ', { align: 'center' });
    doc.text('Dirección: Calle 123, Ciudad', { align: 'center' });
    doc.text('Teléfono: (123) 456-7890', { align: 'center' });
    doc.moveDown(1.5);

    // === IDENTIFICACIÓN DE LA HISTORIA CLÍNICA ===
    doc.fontSize(14).text('2. Identificación de la Historia Clínica', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`HC #: ${mascota._id}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
    doc.text(`Hora: ${new Date().toLocaleTimeString()}`);
    doc.moveDown(1.5);

    // === RESEÑA DEL PACIENTE ===
    doc.fontSize(14).text('3. Reseña del paciente', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Nombre paciente: ${mascota.name}`);
    doc.text(`Especie: ${mascota.species}`);
    doc.text(`Raza: ${mascota.breed || 'N/A'}`);
    doc.text(`Fecha de nacimiento: ${mascota.age ? new Date(mascota.age).toLocaleDateString() : 'N/A'}`);
    doc.text(`Peso: ${mascota.weight || 'N/A'} kg`);
    doc.text(`Chip #: ${mascota.chip || 'N/A'}`);
    doc.moveDown(1.5);

    // === ANAMNESIS ===
    doc.fontSize(14).text('4. Anamnesis', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Enfermedades previas: ${mascota.previousConditions || 'Ninguna'}`);
    doc.text(`Cirugías previas: ${mascota.previousSurgery || 'Ninguna'}`);
    doc.text(`Dieta: ${mascota.diet || 'No disponible'}`);
    doc.text(`Esterilizado: ${mascota.spayed ? 'Sí' : 'No'}`);
    doc.text(`Número de partos: ${mascota.numberOfBirths || 'N/A'}`);
    doc.moveDown(1.5);

    // === HISTORIAL CLÍNICO MANUAL ===
    doc.fontSize(14).text('5. Historial Clínico Manual', { underline: true });
    doc.moveDown(0.5);
    if (historial.historialClinico.length === 0) {
      doc.fontSize(12).text('Sin entradas clínicas registradas.');
    } else {
      historial.historialClinico.forEach(entry => {
        doc
          .fontSize(12)
          .text(`Fecha: ${new Date(entry.fecha).toLocaleDateString()}`)
          .text(`Temperatura: ${entry.temperatura || '-'} °C`)
          .text(`Frecuencia Respiratoria: ${entry.frecuenciaRespiratoria || '-'} rpm`)
          .text(`Observaciones: ${entry.observaciones || '-'}`)
          .text(`Diagnóstico: ${entry.diagnostico || '-'}`)
          .text(`Tratamiento: ${entry.tratamiento || '-'}`)
          .text(`Veterinario: ${entry.creadoPor || '-'}`)
          .moveDown(1);
      });
    }

    // === SIGNOS VITALES AUTOMÁTICOS ===
    doc.addPage();
    doc.fontSize(14).text('6. Signos Vitales Automáticos (Recientes)', { underline: true });
    doc.moveDown(0.5);
    if (historial.saludAutomatica.length === 0) {
      doc.fontSize(12).text('Sin datos registrados.');
    } else {
      const tableHeaders = ['Fecha', 'Pulso (BPM)', 'Actividad (min)', 'Distancia (km)'];
      drawTable(doc, tableHeaders, historial.saludAutomatica.map(data => [
        new Date(data.timestamp).toLocaleString(),
        data.heartRate ?? '-',
        data.activityMinutes ?? '-',
        data.distanceKm ?? '-'
      ]));
    }

    // === ALIMENTACIÓN ===
    doc.addPage();
    doc.fontSize(14).text('7. Registros de Alimentación', { underline: true });
    doc.moveDown(0.5);
    if (historial.alimentacion.length === 0) {
      doc.fontSize(12).text('Sin registros de alimentación.');
    } else {
      const headers = ['Fecha', 'Recomendado (g)', 'Consumido (g)', 'Automático'];
      drawTable(doc, headers, historial.alimentacion.map(feed => [
        new Date(feed.timestamp).toLocaleString(),
        feed.recommendedGrams ?? '-',
        feed.actualGrams ?? '-',
        feed.autoDispensed ? 'Sí' : 'No'
      ]));
    }

    doc.end();

    stream.on('finish', () => resolve(`./pdfs/${nombreArchivo}`));
    stream.on('error', reject);
  });
};

// === FUNCIONALIDAD DE TABLA BÁSICA ===
function drawTable(doc, headers, rows, startY = doc.y + 10) {
  const tableTop = startY;
  const itemHeight = 20;
  const columnSpacing = 10;
  const columnWidths = [150, 100, 120, 100]; // Ajustable

  doc.fontSize(10).fillColor('black');

  // Encabezados
  headers.forEach((header, i) => {
    doc
      .text(header, 50 + i * (columnWidths[i] + columnSpacing), tableTop, {
        width: columnWidths[i],
        align: 'center'
      });
  });

  // Filas
  rows.forEach((row, rowIndex) => {
    const y = tableTop + itemHeight * (rowIndex + 1);

    row.forEach((cell, i) => {
      doc
        .text(cell, 50 + i * (columnWidths[i] + columnSpacing), y, {
          width: columnWidths[i],
          align: 'center'
        });
    });
  });

  doc.moveDown(1);
}
