import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';

initializeApp();
const db = getFirestore();

export const crearHistoricoProducto = onDocumentWritten(
  {
    document: 'productos/{productoId}', // Escucha cualquier cambio en productos
    region: 'us-central1' // Cambia si usas otra región
  },
  async (event) => {
    const afterSnap = event.data?.after;
    if (!afterSnap?.exists) {
      logger.info('Documento eliminado, no se crea histórico.');
      return;
    }

    const producto = afterSnap.data();
    const productoId = afterSnap.id;

    // Puedes agregar timestamp si lo deseas
    const historico = {
      ...producto,
      product: productoId,
      fechaHistorico: new Date().toISOString()
    };

    await db.collection('historico').add(historico);

  }
);
