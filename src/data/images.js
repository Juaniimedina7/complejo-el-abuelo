// Helper de imágenes. Hoy usa fotos de Unsplash como PLACEHOLDER.
// ⚠️ Reemplazar por las fotos reales del complejo (ver README → "Fotos").
// Al migrar, basta con cambiar los IDs de abajo o pasar URLs propias a los datos.

export function ux(id, w = 1200, h = 800) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`
}

// Banco de IDs de Unsplash agrupados por temática (placeholders).
export const IMG = {
  cabanas: ['1449158743715-0a90ebb6d2d8', '1571896349842-33c89424de2d', '1520250497591-112f2f40a3f4', '1587061949409-02df41d5e562'],
  interiores: ['1618221195710-dd6b41faaea6', '1522708323590-d24dbb6b0267', '1560448204-e02f11c3d0e2', '1560185007-cde436f6a4d0'],
  playa: ['1507525428034-b723cf961d3e', '1505228395891-9a51e7e86bf6', '1519046904884-53103b34b206'],
  pileta: ['1571003123894-1f0594d2b5d9', '1544984243-ec57ea16fe25'],
  entorno: ['1441974231531-c6227db76b6e', '1470071459604-3b5ec3a7fe05', '1476514525535-07fb3b4ae5f1'],
  parrilla: ['1555939594-58d7cb561ad1', '1544025162-d76694265947'],
}
