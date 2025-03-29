import axios from 'axios';

export const descargarPdfHistorial = async (petId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/health/pdf/${petId}`, {
      responseType: 'blob'
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `historial_${petId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('❌ Error al descargar PDF:', error);
    alert('No se pudo descargar el PDF.');
  }
};
