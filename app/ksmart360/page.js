'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// ─── Shared data ──────────────────────────────────────────────────────────────


const stats = [
  { value: '18+', label: 'Módulos activos' },
  { value: '5', label: 'Tipos de negocio' },
  { value: '30+', label: 'Empresas activas' },
  { value: '99.9%', label: 'Uptime' },
];

const plans = [
  {
    name: 'Trial',
    icon: '⚡',
    price: 'Gratis',
    period: '14 días',
    description: 'Empieza sin compromiso. Sin tarjeta de crédito.',
    features: [
      { text: 'Acceso completo a todos los módulos', ok: true },
      { text: 'Sin tarjeta de crédito requerida', ok: true },
      { text: 'Expira automáticamente a los 14 días', ok: true },
      { text: 'Wizard de configuración guiado', ok: true },
      { text: 'Soporte incluido', ok: true },
    ],
    cta: 'Empezar gratis',
    highlight: false,
    ctaHref: 'https://www.appjeylor.com/',
  },
  {
    name: 'Básico',
    icon: '🚀',
    price: '$29.900',
    period: '/mes',
    priceNote: 'Hasta −20% pagando anual',
    description: 'Todo el sistema. Sin restricciones de módulos.',
    features: [
      { text: 'Todos los módulos habilitados según tu negocio', ok: true },
      { text: 'POS clásico y touch, inventario, compras', ok: true },
      { text: 'Contabilidad automática en partida doble', ok: true },
      { text: 'Programa de puntos y fidelización', ok: true },
      { text: 'Usuarios ilimitados — celular, tablet y PC', ok: true },
      { text: 'Exportación Excel y PDF', ok: true },
      { text: 'Facturación electrónica DIAN', ok: false },
    ],
    cta: 'Empezar con Básico',
    highlight: false,
    ctaHref: 'https://www.appjeylor.com/',
  },
  {
    name: 'Pro',
    icon: '✨',
    price: '$49.900',
    period: '/mes',
    priceNote: 'Hasta −20% pagando anual',
    description: 'Para el negocio que ya factura electrónicamente.',
    features: [
      { text: 'Todo lo del plan Básico incluido', ok: true },
      { text: 'Facturación electrónica DIAN (UBL 2.1, CUFE, QR)', ok: true },
      { text: 'Gestión de resoluciones con alertas de vencimiento', ok: true },
      { text: 'Soporte prioritario', ok: true },
    ],
    cta: 'Empezar con Pro',
    highlight: true,
    ctaHref: 'https://www.appjeylor.com/',
  },
  {
    name: 'Vitalicio',
    icon: '♾️',
    price: 'Pago único',
    period: 'sin vencimiento',
    description: 'Para alianzas estratégicas y casos especiales.',
    features: [
      { text: 'Todos los beneficios del plan Pro', ok: true },
      { text: 'Sin pagos recurrentes', ok: true },
      { text: 'Asignación por SuperAdmin', ok: true },
      { text: 'Ideal para integradores o aliados', ok: true },
    ],
    cta: 'Hablar con nosotros',
    highlight: false,
    ctaHref: '/#contacto',
  },
];

// ─── PyME view data ───────────────────────────────────────────────────────────

const pymeDifferentials = [
  {
    icon: '📷',
    title: 'Escanea con cámara o con lector — tú decides',
    desc: 'El POS funciona con lector de barras USB para cajas con computador, y también con la cámara del celular o tablet para quienes no tienen hardware. Sin obligaciones. Tú eliges cómo operar.',
    tag: 'Flexible',
  },
  {
    icon: '🌍',
    title: 'Registra productos en segundos con auto-completado global',
    desc: 'Escanea el código de barras de cualquier producto y Ksmart360 lo busca automáticamente en bases de datos mundiales como OpenFoodFacts y UPCitemdb. El nombre, la descripción y la imagen aparecen solos — tú solo pones el precio.',
    tag: 'Inteligente',
  },
  {
    icon: '🎨',
    title: 'Un producto, todas sus variantes',
    desc: 'Maneja un mismo producto en múltiples presentaciones: talla, color, capacidad, sabor. Cada variante tiene su propio stock, precio y código de barras — todo bajo el mismo producto, sin duplicados.',
    tag: 'Versátil',
  },
  {
    icon: '🛍️',
    title: 'Tu catálogo virtual recibe pedidos en WhatsApp y en el sistema',
    desc: 'Crea tu tienda online con un enlace único. Tus clientes exploran los productos, arman el carrito y hacen el pedido — que llega simultáneamente a tu WhatsApp y al sistema para que lo gestiones desde el mismo lugar. El stock siempre sincronizado.',
    tag: 'Digital',
  },
  {
    icon: '⭐',
    title: 'Fidelización con puntos: clientes que vuelven solos',
    desc: 'Programa de puntos integrado al POS. Define cuánto vale cada punto, cómo se acumulan con las compras y cómo el cliente los puede redimir. Todo configurable por el administrador. En cada venta el cliente acumula automáticamente.',
    tag: 'Fidelización',
  },
  {
    icon: '🖨️',
    title: 'Comprobantes donde el cliente quiera recibirlos',
    desc: 'Envía el recibo por WhatsApp al número del cliente con un clic, imprime en impresoras térmicas de 58mm o 80mm, o en papel carta tamaño estándar. Cada formato exacto para cada situación.',
    tag: 'Multi-formato',
  },
  {
    icon: '🏭',
    title: 'Producción y recetas integradas al inventario',
    desc: 'Define la receta de lo que produces — ingredientes, cantidades, merma. Al registrar una producción, el sistema descuenta automáticamente los insumos del inventario y suma el producto terminado al stock. Sin cálculos manuales, sin descuadres.',
    tag: 'Producción',
  },
  {
    icon: '👆',
    title: 'Acceso con huella dactilar o rostro',
    desc: 'Olvídate de contraseñas que se olvidan. Registra tu huella o tu rostro una sola vez y a partir de ese momento entras al sistema con un toque. Tecnología FIDO2 WebAuthn — la misma que usan los bancos.',
    tag: 'Seguro',
  },
  {
    icon: '📒',
    title: 'Contabilidad automática — sin ser contador',
    desc: 'Cada venta, compra, gasto o cobro genera automáticamente el asiento contable en partida doble, siguiendo el PUC colombiano. Diferencia caja de bancos sola y separa el IVA automáticamente. El sistema lleva tu contabilidad en segundo plano mientras tú operas.',
    tag: 'Contabilidad',
  },
];

const pymeDeepFeatures = [
  {
    icon: '🛒',
    title: 'Un POS diseñado para cómo realmente vendes',
    body: [
      'Hay negocios que venden con báscula — mercados, tiendas de granos, fruterías. Hay negocios que venden con escáner de barras en caja registradora. Y hay tiendas de variedades donde el vendedor prefiere tocar en pantalla. Ksmart360 tiene un modo para cada uno.',
      '**Modo clásico con teclado y escáner:** conecta tu lector USB y vende a la velocidad que tus manos se muevan. Escáner, cantidad, pago — en segundos.',
      '**Modo touch táctil:** los productos aparecen como tarjetas por categoría. Toca, agrega al carrito, cobra. Ideal para tablet o pantalla táctil.',
      'En ambos modos puedes combinar hasta cuatro métodos de pago en una sola venta: efectivo + Nequi + tarjeta + saldo a favor. El sistema calcula el cambio, registra la referencia y genera el comprobante.',
    ],
  },
  {
    icon: '🍽️',
    title: 'El restaurante digital que opera como el tuyo de verdad',
    body: [
      'Primero diseñas el plano de tu local: ubicas cada mesa exactamente como está físicamente en tu salón, con su número y su zona. Lo que ves en pantalla es lo que tienes en el piso.',
      'El mesero toma el pedido desde su celular o tablet y lo confirma. En ese instante, la comanda aparece en la pantalla de cocina (KDS) y se imprime automáticamente en la impresora térmica de la cocina. Sin gritos, sin papeles volando, sin pedidos perdidos.',
      'Cada plato tiene un estado en cocina: pendiente, en preparación, listo. El administrador configura si el mesero puede cobrar directamente en la mesa o si todo pasa por caja centralizada. El sistema se adapta a cómo tú quieres operar, no al revés.',
    ],
  },
  {
    icon: '📦',
    title: 'Inventario que se gestiona solo con cada movimiento',
    body: [
      'Cada venta descuenta. Cada compra suma. Cada producción consume insumos y genera producto terminado. Cada ajuste queda registrado con quién lo hizo, cuándo y por qué. El inventario siempre refleja la realidad.',
      'Recibes alertas automáticas cuando un producto cae por debajo del stock mínimo que tú configuraste. No más "se nos acabó el producto" en medio de la venta.',
      'El historial completo de cada producto — su kardex — está siempre disponible. Puedes saber exactamente cuántas unidades se vendieron, cuándo entró cada lote, quién hizo cada ajuste. Trazabilidad total, sin trabajo manual.',
    ],
  },
  {
    icon: '📒',
    title: 'La contabilidad de tu negocio, en orden — sin ser contador',
    body: [
      'Cada vez que registras una venta, una compra, un gasto o el cobro de una cuota, Ksmart360 genera automáticamente el asiento contable en partida doble correspondiente, siguiendo el Plan Único de Cuentas (PUC) colombiano. No ingresas nada manualmente — el sistema trabaja en segundo plano mientras tú operas.',
      '**Diferencia caja y bancos sin que toques nada:** si el pago fue en efectivo, registra en Caja. Si fue por Nequi, Daviplata, transferencia o tarjeta, registra en Bancos. El IVA de cada venta se contabiliza en su cuenta separada (IVA por pagar), igual que el IVA descontable de tus compras.',
      '**¿Llevas tiempo operando y activaste el módulo tarde?** Sin problema. El sistema puede generar retroactivamente todos los asientos contables de tus transacciones anteriores con un solo clic — sin duplicados, sin trabajo manual. Tu contabilidad completa, al día, desde el primer día que registraste en el sistema.',
    ],
  },
  {
    icon: '📊',
    title: 'Tu negocio en números — en tiempo real, sin abrir un reporte',
    body: [
      'El dashboard de Ksmart360 es lo primero que ves al abrir el sistema. Sin hacer nada, sin generar reportes: las ventas del día, los productos bajo stock mínimo, el flujo de caja y el estado de tu operación en tiempo real. La radiografía completa de tu negocio en un solo vistazo.',
      'Cuando necesitas más detalle, tienes 9 tipos de reporte: resumen de ventas, productos más vendidos, rentabilidad por producto, clientes compradores, cuentas por cobrar con aging, IVA neto, productividad por operador, kardex de inventario y estado de resultados. Todos con filtros por fecha, producto, cliente, categoría o vendedor. Todos exportables a Excel o PDF con un clic.',
      '**La diferencia entre un negocio que crece y uno que sobrevive está en conocer sus números.** Ksmart360 te los da — sin hojas de cálculo, sin cuentas manuales, sin esperar al contador a fin de mes.',
    ],
  },
  {
    icon: '📄',
    title: 'Cotizaciones que se convierten en venta con un clic',
    body: [
      'Crea una cotización profesional en segundos: agrega los productos, selecciona el cliente, define la vigencia y guarda. El sistema genera un número único de cotización que puedes compartir con el cliente. Cuando apruebe, tú haces clic en "Facturar" — y listo. La venta queda registrada, el stock descontado y el comprobante generado. Sin volver a ingresar nada.',
      '**Ideal para ferreterías, distribuidoras, talleres y cualquier negocio que cotice antes de vender.** El historial de cotizaciones por cliente siempre disponible — sabes qué le cotizaste, cuándo y si terminó comprando. Cero trabajo duplicado.',
    ],
  },
];

const pymeSteps = [
  {
    step: '01',
    title: 'Regístrate en 2 minutos',
    desc: 'Elige tu tipo de negocio — tienda, parqueadero, lavadero o restaurante. El sistema activa automáticamente los módulos que necesitas. Sin configuración técnica.',
    detail: 'Sin instalaciones · Wizard de inicio guiado',
  },
  {
    step: '02',
    title: 'Carga tu catálogo con la cámara',
    desc: 'Escanea el código de barras de cada producto con tu celular y el sistema lo completa automáticamente desde bases de datos globales. O importa todo tu inventario por Excel en un solo paso.',
    detail: 'Auto-completado mundial · Carga masiva por Excel',
  },
  {
    step: '03',
    title: 'Empieza a operar desde hoy',
    desc: 'Vende con POS, registra producción, controla inventario, fideliza clientes y envía recibos por WhatsApp desde el primer día. Sin capacitación técnica. Soporte incluido.',
    detail: 'Soporte incluido · Acceso completo 14 días gratis',
  },
];

const pymeIndustries = [
  {
    icon: '🏪',
    name: 'Tienda / ERP',
    subtitle: 'Tiendas · Mercados · Ferreterías · Distribuidoras · Talleres',
    headline: 'Vende más, pierde menos, fideliza mejor.',
    benefits: [
      { icon: '⌨️', text: 'POS clásico con teclado y lector de barras USB para cajas con computador' },
      { icon: '👆', text: 'POS táctil para tablet: toca el producto, agrega al carrito, cobra' },
      { icon: '⚖️', text: 'Compatible con báscula digital para negocios que venden por peso' },
      { icon: '🌍', text: 'Registro de productos con auto-completado desde bases de datos globales al escanear' },
      { icon: '🎨', text: 'Variantes por talla, color o capacidad — cada una con stock y precio propio' },
      { icon: '🏭', text: 'Módulo de recetas y producción integrado: los insumos se descuentan solos' },
      { icon: '⭐', text: 'Fidelización por puntos: el cliente acumula en cada compra, configurable por el admin' },
      { icon: '🛍️', text: 'Catálogo virtual con pedidos que llegan a WhatsApp y al sistema simultáneamente' },
      { icon: '📄', text: 'Cotizaciones que se convierten en venta con un solo clic' },
      { icon: '🖨️', text: 'Comprobantes por WhatsApp, impresoras 58mm/80mm o papel carta' },
      { icon: '📦', text: 'Inventario actualizado en tiempo real en cada movimiento — sin trabajo manual' },
      { icon: '🔔', text: 'Alerta automática cuando un producto cae por debajo del stock mínimo' },
    ],
  },
  // Prestamista removido de la vista pública por consideraciones legales y regulatorias
  // { icon: '💰', name: 'Prestamista', subtitle: 'Préstamos · Microcrédito · Cooperativas', ... }
  {
    icon: '🚗',
    name: 'Parqueadero',
    subtitle: 'Motos · Carros · Bicicletas · Mix',
    headline: 'Nada entra ni sale sin registro. Control total.',
    benefits: [
      { icon: '⏱️', text: 'El cobro se calcula automáticamente según el tiempo exacto de estadía' },
      { icon: '🔴', text: 'Cupos ocupados y disponibles en tiempo real en pantalla' },
      { icon: '📅', text: 'Mensualidades con alerta automática por WhatsApp cuando vencen' },
      { icon: '🔔', text: 'Al escanear una placa con suscripción vencida aparece alerta roja inmediata' },
      { icon: '💳', text: 'Cobra en efectivo, Nequi, transferencia o tarjeta' },
      { icon: '📊', text: 'Cierre de turno con ingresos del día por método de pago' },
    ],
  },
  {
    icon: '🚿',
    name: 'Lavadero',
    subtitle: 'Autolavado · Detailing · Car wash',
    headline: 'Sabe exactamente cuánto produce cada operario.',
    benefits: [
      { icon: '🚗', text: 'Registra placa, tipo de vehículo, servicios y operario en segundos' },
      { icon: '👷', text: 'Cada servicio queda asignado a un operario específico con hora de inicio' },
      { icon: '💰', text: 'Comisiones de operarios calculadas automáticamente al cierre del día' },
      { icon: '📊', text: 'Reporte de productividad por trabajador: vehículos atendidos e ingresos generados' },
      { icon: '🕐', text: 'Historial completo de servicios por placa de vehículo' },
      { icon: '💳', text: 'Múltiples métodos de pago en el mismo servicio' },
    ],
  },
  {
    icon: '🍽️',
    name: 'Restaurante',
    subtitle: 'Cafetería · Comidas rápidas · Restaurante',
    headline: 'Tu restaurante, digitalizado tal como opera en la vida real.',
    benefits: [
      { icon: '🗺️', text: 'Diseña el plano de tu local: ubica cada mesa exactamente como está en tu salón' },
      { icon: '📱', text: 'El mesero toma el pedido desde celular o tablet — llega a cocina en segundos, sin papel' },
      { icon: '👨‍🍳', text: 'Pantalla de cocina (KDS): cada plato con su estado — pendiente, en preparación, listo' },
      { icon: '🖨️', text: 'La comanda se imprime automáticamente en la impresora de cocina al confirmar el pedido' },
      { icon: '💳', text: 'El admin configura si el mesero cobra en mesa o si todo pasa por caja centralizada' },
      { icon: '📊', text: 'Cierre del día con ventas por mesa, mesero, producto y método de pago' },
    ],
  },
];

const pymeCapabilities = [
  {
    category: 'Ventas y POS',
    color: 'blue',
    items: [
      'POS táctil (touch screen)',
      'POS clásico con teclado y lector',
      'Escáner por cámara del celular',
      'Hasta 4 métodos de pago en una venta',
      'Ventas a crédito con control de cupo',
      'Devoluciones con nota crédito',
      'Cotizaciones → Factura en un clic',
      'Fidelización con puntos',
      'Facturación electrónica DIAN',
      'Comprobante por WhatsApp',
    ],
  },
  {
    category: 'Inventario',
    color: 'green',
    items: [
      'Auto-completado global al escanear',
      'Productos con variantes',
      'Lotes y vencimientos (FEFO)',
      'Kardex con trazabilidad total',
      'Alertas de stock mínimo',
      'Carga masiva por Excel',
      'Precios con centavos',
      'Categorías con color',
      'Ajustes de inventario',
      'Costo promedio ponderado',
    ],
  },
  {
    category: 'Gestión operativa',
    color: 'purple',
    items: [
      'Órdenes de trabajo con estados',
      'Panel del operador en campo',
      'Evidencia fotográfica antes/después',
      'Producción BOM con recetas',
      'Compras con desglose completo',
      'Ítems libres en compras',
      'Cuentas por pagar a proveedores',
      'Corte de caja diario',
      'Registro de gastos por categoría',
      'Historial de arqueos',
    ],
  },
  {
    category: 'Clientes y cobros',
    color: 'orange',
    items: [
      'Perfil completo por cliente',
      'Historial de transacciones',
      'Cartera con aging (30/60/90 días)',
      'Cobro por WhatsApp en un clic',
      'Cuentas por cobrar con seguimiento',
      'Alertas de vencimiento automáticas',
      'Recibo PDF por WhatsApp',
      'Programa de puntos y fidelización',
      'Notas y observaciones por cliente',
      'Segmentación por comportamiento',
    ],
  },
  {
    category: 'Análisis y finanzas',
    color: 'teal',
    items: [
      'Dashboard en tiempo real',
      '9 tipos de reporte',
      'Export a Excel y PDF',
      'Estado de resultados',
      'Contabilidad automática PUC',
      'Partida doble sin intervención',
      'IVA separado automático',
      'Caja vs. Bancos automático',
      'Backfill histórico contable',
      'IVA neto ventas vs. compras',
    ],
  },
  {
    category: 'Sectores y digitalización',
    color: 'pink',
    items: [
      'Catálogo virtual con URL propia',
      'Pedidos a WhatsApp y al sistema',
      'Parqueadero con tarifas y cupos',
      'Mensualidades con alertas',
      'Lavadero con operadores',
      'Restaurante con KDS',
      'Comandas digitales a cocina',
      'Diseño de mapa de mesas',
      'Acceso biométrico FIDO2',
      'Roles y permisos por módulo',
    ],
  },
];

// ─── Tech view data ───────────────────────────────────────────────────────────

const techFeatures = [
  { emoji: '🛒', title: 'POS Dual Mode', description: 'Clásico (teclado + escáner) y Touch Mode táctil. Hasta 4 métodos de pago por factura. Cotizaciones que se convierten en venta con un clic. Programa de puntos integrado.' },
  { emoji: '📦', title: 'Inventario FEFO', description: 'Kardex por costo promedio ponderado. Lotes con fecha de vencimiento. Alertas automáticas de stock mínimo. Variantes por talla, color o capacidad.' },
  { emoji: '🏭', title: 'Producción BOM', description: 'Recetas con ingredientes, rendimiento y merma. Lotes de producción: materia prima → producto terminado. Rollup de costos automático.' },
  { emoji: '🛍️', title: 'Compras Inteligentes', description: 'Ítems libres sin catálogo para gastos ocasionales. Orden de ingreso preservado. OC en PDF automático. Soporte de centavos para evitar descuadres contables.' },
  { emoji: '💰', title: 'Cartera & Cobros', description: 'Cuentas por cobrar con aging (30/60/90 días). Alertas automáticas de vencimiento. Seguimiento de clientes. Recibos PDF por WhatsApp.' },
  { emoji: '🧾', title: 'Facturación DIAN', description: 'Resoluciones, numeración automática, CUFE, XML/PDF. Integración Matias API. Campos tributarios completos. Modo pruebas y producción.' },
  { emoji: '📊', title: '9 Tipos de Reporte', description: 'Ventas, rentabilidad, IVA neto, P&L simplificado, kardex, CxC aging, productividad, producción y más. Export a Excel y PDF.' },
  { emoji: '🌐', title: 'Catálogo Virtual', description: 'Tienda pública con URL única por empresa. Sincronización de stock automática. Pedidos directamente desde WhatsApp.' },
];

const techIndustries = [
  {
    icon: '🏪',
    name: 'Comercio ERP',
    subtitle: 'Retail · Mayorista · Ferretería · Distribuidora · Taller',
    modules: ['POS dual mode + escáner de barras', 'Inventario FEFO con lotes y alertas', 'Compras con ítems libres', 'Facturación electrónica DIAN', 'Producción BOM + transformación', 'Cartera CxC + fidelización', 'Catálogo virtual online', 'Cotizaciones → Factura'],
  },
  // Prestamos removido de la vista pública por consideraciones legales y regulatorias
  // { icon: '💰', name: 'Prestamos', subtitle: 'Microfinanzas · Crédito informal · Cooperativas', ... }
  {
    icon: '🚗',
    name: 'Parqueadero',
    subtitle: 'Motos · Carros · Bicicletas · Mix',
    modules: ['Entrada y salida rápida de vehículos', 'Tarifas por hora, fracción o día', 'Suscripciones mensuales', 'Ocupación en tiempo real', 'Multi-método de pago', 'Alertas WhatsApp de vencimiento', 'Reportes de ingresos por turno'],
  },
  {
    icon: '🚿',
    name: 'Lavadero',
    subtitle: 'Autolavado · Detailing · Car wash',
    modules: ['POS de servicios de lavado', 'Asignación de operadores', 'Comisiones automáticas por servicio', 'Reporte de productividad por operador', 'Historial por placa de vehículo', 'Control de turno y estado de órdenes'],
  },
  {
    icon: '🍽️',
    name: 'Restaurante',
    subtitle: 'Cafetería · Comidas rápidas · Restaurante',
    modules: ['Mapa de mesas por zona en tiempo real', 'Comandas digitales desde tablet', 'KDS: pantalla de cocina', 'Estado por ítem en tiempo real', 'Caja integrada para cajero', 'Impresión automática de comandas P80', 'Categorías de menú configurables'],
  },
];

const techStack = [
  {
    label: 'React 18', desc: 'Frontend SPA', color: '#61DAFB',
    svg: <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-5 h-5"><path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.12.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.468zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.468a23.307 23.307 0 0 0-1.363-3.578l-.101-.213.101-.213a23.53 23.53 0 0 0 1.363-3.578l.133-.468.472.12c3.518.889 5.536 2.398 5.536 4.139s-2.018 3.25-5.536 4.139l-.472.12zm.753-7.305a24.753 24.753 0 0 1-1.182 3.046 24.95 24.95 0 0 1 1.182 3.046c2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046z"/></svg>,
  },
  {
    label: 'FastAPI', desc: 'Backend Python 3.11', color: '#009688',
    svg: <svg viewBox="0 0 24 24" fill="#009688" className="w-5 h-5"><path d="M12 0C5.376 0 0 5.376 0 12c0 6.624 5.376 12 12 12 6.624 0 12-5.376 12-12C24 5.376 18.624 0 12 0zm-.624 21.504v-7.248H6.48L13.2 2.496v7.248h4.896l-6.72 11.76z"/></svg>,
  },
  {
    label: 'PostgreSQL 17', desc: 'Base de datos', color: '#336791',
    svg: <svg viewBox="0 0 24 24" className="w-5 h-5"><ellipse cx="12" cy="6" rx="9" ry="3.5" fill="#336791"/><path d="M3 6v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5V6" fill="none" stroke="#336791" strokeWidth="1.5"/><path d="M3 10v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5v-4" fill="none" stroke="#336791" strokeWidth="1.5"/><path d="M3 14v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5v-4" fill="none" stroke="#336791" strokeWidth="1.5"/></svg>,
  },
  {
    label: 'Oracle Cloud', desc: 'Infraestructura ARM', color: '#F80000',
    svg: <svg viewBox="0 0 24 24" fill="#F80000" className="w-5 h-5"><path d="M16.412 4.412a7.589 7.589 0 0 1 0 15.176H7.588a7.589 7.589 0 0 1 0-15.176h8.824zm0 2.87H7.588a4.719 4.719 0 0 0 0 9.436h8.824a4.719 4.719 0 0 0 0-9.436z"/></svg>,
  },
  {
    label: 'Pydantic v2', desc: 'Validación', color: '#e92063',
    svg: <svg viewBox="0 0 24 24" fill="#e92063" className="w-5 h-5"><path d="M12 0L1.608 6v12L12 24l10.392-6V6zm0 2.4l8.004 4.62v9.24L12 21l-8.004-4.74V6.96zm-.5 2.6v5.5l4.775 2.757-.5.866L10 11.25V5z"/></svg>,
  },
  {
    label: 'SQLAlchemy', desc: 'ORM', color: '#D71F00',
    svg: <svg viewBox="0 0 24 24" className="w-5 h-5"><ellipse cx="12" cy="6" rx="9" ry="3.5" fill="none" stroke="#D71F00" strokeWidth="1.5"/><path d="M3 6v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5V6" fill="none" stroke="#D71F00" strokeWidth="1.5"/><path d="M3 10v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5v-4" fill="none" stroke="#D71F00" strokeWidth="1.5"/><path d="M3 14v4c0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5v-4" fill="none" stroke="#D71F00" strokeWidth="1.5"/></svg>,
  },
  {
    label: 'Vercel CDN', desc: 'Frontend global', color: '#000000',
    svg: <svg viewBox="0 0 24 24" fill="#000" className="w-5 h-5"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>,
  },
  {
    label: 'Nginx + SSL', desc: 'Proxy inverso', color: '#009900',
    svg: <svg viewBox="0 0 24 24" fill="#009900" className="w-5 h-5"><path d="M12 0L1.605 6.2v11.6L12 24l10.395-6.2V6.2zm0 4.1l6.962 11.8H5.038z"/></svg>,
  },
  {
    label: 'Wompi', desc: 'Pagos Colombia', color: '#6B2DE3',
    svg: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="2" y="5" width="20" height="14" rx="3" fill="none" stroke="#6B2DE3" strokeWidth="1.5"/><path d="M2 9h20" stroke="#6B2DE3" strokeWidth="1.5"/><circle cx="7" cy="15" r="1.5" fill="#6B2DE3"/><circle cx="12" cy="15" r="1.5" fill="#6B2DE3" opacity=".5"/></svg>,
  },
  {
    label: 'DIAN / Matias', desc: 'Facturación electrónica', color: '#003DA6',
    svg: <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="none" stroke="#003DA6" strokeWidth="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#003DA6" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    label: 'WebAuthn FIDO2', desc: 'Biométrico', color: '#0066CC',
    svg: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="3" y="11" width="18" height="12" rx="2" fill="none" stroke="#0066CC" strokeWidth="1.5"/><path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="#0066CC" strokeWidth="1.5"/><circle cx="12" cy="17" r="1.5" fill="#0066CC"/></svg>,
  },
  {
    label: 'WhatsApp API', desc: 'Notificaciones', color: '#25D366',
    svg: <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  },
];

const security = [
  { icon: '🔑', title: 'JWT + empresa_id', desc: 'Token firmado con el identificador de empresa en cada request. Aislamiento multi-tenant total.' },
  { icon: '👆', title: 'Biométrico FIDO2', desc: 'WebAuthn: huella dactilar o reconocimiento facial. Sin contraseña, máxima seguridad.' },
  { icon: '🔢', title: 'PIN de acceso', desc: 'PIN de 4-6 dígitos con bloqueo automático tras intentos fallidos.' },
  { icon: '🛡️', title: 'RBAC multi-módulo', desc: '18+ módulos con permisos por rol: SuperAdmin, Admin, Operador, Cobrador.' },
  { icon: '🌐', title: 'Rate limiting', desc: 'SlowAPI protege endpoints de autenticación contra abuso y fuerza bruta.' },
  { icon: '🔒', title: 'HTTPS forzado', desc: "Let's Encrypt con renovación automática. Tráfico cifrado extremo a extremo." },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

// ─── PyME View ────────────────────────────────────────────────────────────────

function PymeView() {
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <>
      {/* ── Diferenciales ── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Por qué Ksmart360
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Funcionalidades que<br className="hidden lg:block" />
              <span className="text-azulStack"> realmente importan.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-xl mx-auto leading-relaxed">
              Cada detalle fue pensado para el día a día de un negocio colombiano real. Sin funciones de relleno, sin configuraciones innecesarias.
            </motion.p>
          </Section>

          <Section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pymeDifferentials.map((d, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-azulStack/30 hover:shadow-lg hover:shadow-azulStack/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{d.icon}</div>
                  <span className="text-[10px] font-mono font-semibold text-azulStack bg-azulTinte px-2 py-0.5 rounded-full tracking-wider">
                    {d.tag}
                  </span>
                </div>
                <h3 className="font-sora font-bold text-base text-grafito mb-2 tracking-tight">{d.title}</h3>
                <p className="font-sora text-sm text-acero leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── Deep features ── */}
      <section className="py-24 lg:py-32 bg-grafito overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azul bg-azul/10 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              En detalle
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight">
              Diseñado para el mundo real.<br className="hidden lg:block" />
              <span className="text-azul"> No para un manual.</span>
            </motion.h2>
          </Section>

          <Section className="flex flex-col gap-10">
            {pymeDeepFeatures.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{f.icon}</span>
                  <h3 className="font-sora font-bold text-xl lg:text-2xl text-white tracking-tight leading-snug">{f.title}</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {f.body.map((paragraph, j) => {
                    const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                    return (
                      <p
                        key={j}
                        className="font-sora text-sm lg:text-base text-white/55 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── Tu tipo de negocio ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Elige tu negocio
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Un sistema adaptado <span className="text-azulStack">a lo que haces.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-xl mx-auto leading-relaxed">
              Al registrarte eliges tu tipo de negocio y el sistema activa exactamente lo que necesitas. Sin módulos de más, sin configuración manual.
            </motion.p>
          </Section>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {pymeIndustries.map((ind, i) => (
              <button
                key={i}
                onClick={() => setActiveIndustry(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-sora transition-all duration-200 ${
                  activeIndustry === i
                    ? 'bg-azulStack text-white shadow-md shadow-azulStack/25'
                    : 'bg-gray-50 text-acero hover:bg-gray-100'
                }`}
              >
                <span>{ind.icon}</span>
                {ind.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-papel border border-gray-100 rounded-2xl p-8 lg:p-10"
            >
              <div className="flex items-start gap-5 mb-3">
                <div className="text-5xl">{pymeIndustries[activeIndustry].icon}</div>
                <div>
                  <h3 className="font-sora font-bold text-2xl text-grafito tracking-tight">{pymeIndustries[activeIndustry].name}</h3>
                  <p className="font-sora text-sm text-acero mt-0.5">{pymeIndustries[activeIndustry].subtitle}</p>
                </div>
              </div>
              <p className="font-sora font-semibold text-azulStack text-base mb-6 ml-0">{pymeIndustries[activeIndustry].headline}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pymeIndustries[activeIndustry].benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3.5">
                    <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
                    <span className="font-sora text-sm text-grafito leading-snug">{b.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ¿Tu negocio no está aquí? */}
          <Section className="mt-8">
            <motion.div
              variants={fadeUp}
              className="bg-grafito rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8"
            >
              <div className="flex-1 text-center lg:text-left">
                <span className="inline-block text-xs font-mono font-medium text-azul bg-azul/15 border border-azul/25 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                  Sin límites
                </span>
                <h3 className="font-sora font-bold text-2xl lg:text-3xl text-white leading-tight mb-3">
                  ¿Tu modelo de negocio no está aquí?
                </h3>
                <p className="font-sora text-sm text-white/60 leading-relaxed max-w-xl">
                  Ksmart360 es una plataforma viva, no un producto cerrado. Con la experiencia, el rigor técnico y el profesionalismo de <strong className="text-white">Tech Stack Colombia</strong>, construimos y adaptamos el sistema a cualquier tipo de negocio — si tu operación tiene lógica, nosotros la digitalizamos. Escríbenos y lo evaluamos juntos.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full lg:w-auto">
                <div className="grid grid-cols-2 gap-2 mb-2 w-full">
                  {['🏪 Tienda', '🚗 Parqueadero', '🧼 Lavadero', '🍽️ Restaurante', '🏭 Manufactura', '💼 Servicios', '🏥 Salud', '✨ Tu idea'].map((item, i) => (
                    <span key={i} className={`font-sora text-xs px-3 py-1.5 rounded-lg text-center ${i < 4 ? 'bg-azul/20 text-azul border border-azul/30' : 'bg-white/5 text-white/35 border border-white/10 border-dashed'}`}>{item}</span>
                  ))}
                </div>
                <a
                  href="/#contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors font-sora cursor-pointer w-full justify-center"
                >
                  Hablemos de tu negocio
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Catálogo Virtual ── */}
      <section className="py-24 lg:py-32 bg-grafito overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-azul/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azul bg-azul/15 border border-azul/25 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Catálogo Virtual · Diferencial exclusivo
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight">
              Tu tienda online.<br />
              <span className="text-azul">Incluida en todos los planes.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-white/55 mt-4 max-w-2xl mx-auto leading-relaxed">
              Ksmart360 genera automáticamente una tienda virtual con URL propia y código QR descargable. Tus clientes ordenan desde el celular — sin apps, sin intermediarios. El sistema la adapta inteligentemente según el tipo de negocio.
            </motion.p>
          </Section>

          {/* URL y QR */}
          <Section className="mb-12">
            <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 max-w-2xl mx-auto">
              <div className="flex-1 text-center sm:text-left">
                <p className="font-sora text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">Tu URL personalizada</p>
                <div className="font-mono text-sm text-white bg-white/8 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-white/40">appjeylor.com/</span>
                  <span className="text-azul font-bold">tunegocio</span>
                  <span className="ml-auto text-[10px] text-azul bg-azul/15 border border-azul/25 px-2 py-0.5 rounded-md">editable</span>
                </div>
                <p className="font-sora text-xs text-white/40 mt-3 leading-relaxed">El slug es configurable en cualquier momento desde el sistema. Comparte el enlace o el QR — los clientes entran directo.</p>
              </div>
              <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-16 h-16">
                  <rect x="4" y="4" width="30" height="30" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="4"/>
                  <rect x="12" y="12" width="14" height="14" rx="1" fill="#1a1a1a"/>
                  <rect x="46" y="4" width="30" height="30" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="4"/>
                  <rect x="54" y="12" width="14" height="14" rx="1" fill="#1a1a1a"/>
                  <rect x="4" y="46" width="30" height="30" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="4"/>
                  <rect x="12" y="54" width="14" height="14" rx="1" fill="#1a1a1a"/>
                  <rect x="46" y="46" width="8" height="8" rx="1" fill="#1a1a1a"/>
                  <rect x="58" y="46" width="8" height="8" rx="1" fill="#1a1a1a"/>
                  <rect x="70" y="46" width="6" height="8" rx="1" fill="#1a1a1a"/>
                  <rect x="46" y="58" width="8" height="8" rx="1" fill="#1a1a1a"/>
                  <rect x="58" y="62" width="18" height="6" rx="1" fill="#1a1a1a"/>
                </svg>
              </div>
            </motion.div>
          </Section>

          {/* Dos modos */}
          <Section className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Modo Tienda */}
            <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-azul/20 border border-azul/30 flex items-center justify-center text-xl">🏪</div>
                <div>
                  <h3 className="font-sora font-bold text-white text-lg leading-tight">Tienda / Comercio</h3>
                  <p className="font-sora text-xs text-white/40">Pedidos con opción de recogida o domicilio</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {[
                  { n: '1', text: 'El cliente abre tu URL o escanea el QR desde el celular' },
                  { n: '2', text: 'Explora el catálogo, agrega productos al carrito con todos los detalles' },
                  { n: '3', text: 'Elige recoger en tienda o pedir domicilio e ingresa sus datos básicos' },
                  { n: '4', text: 'El pedido llega simultáneamente a tu WhatsApp y al módulo Pedidos Virtuales' },
                  { n: '5', text: 'Gestionas el pedido: validas stock, generas el movimiento de inventario y envías notificaciones de estado al cliente' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-azul/25 text-azul text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">{step.n}</span>
                    <p className="font-sora text-sm text-white/65 leading-snug">{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/8 flex flex-wrap gap-2">
                {['Recogida en tienda', 'Domicilio', 'Notificaciones WhatsApp', 'Pedidos Virtuales', 'Stock validado'].map((t, i) => (
                  <span key={i} className="font-mono text-[10px] text-azul bg-azul/10 border border-azul/20 px-2 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Modo Restaurante */}
            <motion.div variants={fadeUp} className="bg-white/5 border border-green-500/20 rounded-2xl p-7 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-xl">🍽️</div>
                <div>
                  <h3 className="font-sora font-bold text-white text-lg leading-tight">Restaurante · Autoservicio</h3>
                  <p className="font-sora text-xs text-white/40">La carta digital en el celular del comensal</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {[
                  { n: '1', text: 'El cliente escanea el QR de su mesa con el celular — sin descargar nada' },
                  { n: '2', text: 'Ve la carta con fotos, descripción y precio de cada plato y preparación' },
                  { n: '3', text: 'Arma su pedido y presiona "Enviar a cocina" o "Enviar pedido"' },
                  { n: '4', text: 'El sistema le pide el número de mesa (visible en la mesa) para identificar la orden' },
                  { n: '5', text: 'El pedido llega al módulo de cocina (KDS) o se imprime la comanda automáticamente, según configuración del admin' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">{step.n}</span>
                    <p className="font-sora text-sm text-white/65 leading-snug">{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/8 flex flex-wrap gap-2">
                {['Sin meseros', 'QR por mesa', 'KDS cocina', 'Comanda automática', 'Autoservicio'].map((t, i) => (
                  <span key={i} className="font-mono text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* Features comunes */}
          <Section>
            <motion.div variants={fadeUp} className="bg-white/4 border border-white/8 rounded-2xl p-6">
              <p className="font-sora text-xs text-white/40 uppercase tracking-wider font-medium mb-4 text-center">Funcionalidades comunes a ambos modos</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '📦', title: 'Stock siempre sincronizado', desc: 'Solo aparecen productos con inventario disponible. Sin ventas de lo que no tienes.' },
                  { icon: '🎛️', title: 'Control total del admin', desc: 'Decides qué productos o platos aparecen en el catálogo desde el módulo de productos.' },
                  { icon: '📱', title: 'QR descargable', desc: 'El sistema genera el QR de tu catálogo listo para imprimir o compartir en redes.' },
                  { icon: '🔔', title: 'Notificaciones de estado', desc: 'Envía updates al WhatsApp del cliente en cualquier momento: confirmado, en preparación, listo.' },
                ].map((f, i) => (
                  <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-4">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <h4 className="font-sora font-semibold text-white text-sm mb-1 leading-tight">{f.title}</h4>
                    <p className="font-sora text-xs text-white/45 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/8 text-center">
                <span className="font-sora text-xs text-azul font-semibold">✓ Incluido en el plan Trial gratuito y en todos los planes de pago — sin costo adicional.</span>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Link de Pago & QR ── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Link de Pago & QR · En todos los planes
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Cobra en segundos.<br />
              <span className="text-azulStack">Sin datafono. Sin complicaciones.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-2xl mx-auto leading-relaxed">
              En Colombia la realidad del cobro digital es el Nequi, el Bold y el QR pegado en el mostrador. Ksmart360 lo integra directamente al punto de venta — sin salir del sistema, sin buscar el celular, sin copiar nada.
            </motion.p>
          </Section>

          <Section className="grid lg:grid-cols-2 gap-10 items-start mb-12">
            {/* Visual del modal POS */}
            <motion.div variants={fadeUp}>
              <h3 className="font-sora font-bold text-grafito text-lg mb-5">En el flujo de venta — para el cajero</h3>
              <div className="bg-grafito rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border border-white/5">
                {/* Window bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0C12] border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-4 text-xs text-white/30 font-mono">Ksmart360 · Punto de Venta</span>
                </div>
                <div className="p-6">
                  {/* Métodos de pago */}
                  <p className="font-sora text-xs text-white/40 mb-3 uppercase tracking-wider">Selecciona método de pago</p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {['Efectivo', 'Tarjeta', 'Transferencia / QR'].map((m, i) => (
                      <div key={i} className={`rounded-xl py-2.5 px-3 text-center font-sora text-xs font-semibold border ${i === 2 ? 'bg-azul text-white border-azul shadow-lg shadow-azul/30' : 'bg-white/5 text-white/40 border-white/10'}`}>{m}</div>
                    ))}
                  </div>
                  {/* Modal QR */}
                  <div className="bg-white rounded-2xl p-5">
                    <p className="text-center font-sora text-xs text-gray-400 mb-4 uppercase tracking-wider font-medium">Escanea para pagar</p>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-32 h-32 bg-grafito rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 80 80" className="w-24 h-24">
                          <rect x="4" y="4" width="30" height="30" rx="3" fill="none" stroke="white" strokeWidth="4"/>
                          <rect x="12" y="12" width="14" height="14" rx="1" fill="white"/>
                          <rect x="46" y="4" width="30" height="30" rx="3" fill="none" stroke="white" strokeWidth="4"/>
                          <rect x="54" y="12" width="14" height="14" rx="1" fill="white"/>
                          <rect x="4" y="46" width="30" height="30" rx="3" fill="none" stroke="white" strokeWidth="4"/>
                          <rect x="12" y="54" width="14" height="14" rx="1" fill="white"/>
                          <rect x="46" y="46" width="8" height="8" rx="1" fill="white"/>
                          <rect x="58" y="46" width="8" height="8" rx="1" fill="white"/>
                          <rect x="70" y="46" width="6" height="8" rx="1" fill="white"/>
                          <rect x="46" y="58" width="8" height="8" rx="1" fill="white"/>
                          <rect x="58" y="62" width="18" height="6" rx="1" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-center font-sora text-xs text-gray-400 mb-4">Nequi empresa · <span className="text-grafito font-semibold">$45.000</span></p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <button className="flex items-center justify-center gap-2 py-2.5 bg-green-50 border border-green-200 rounded-xl font-sora text-xs font-semibold text-green-700">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                        Enviar por WhatsApp
                      </button>
                      <button className="py-2.5 bg-azul rounded-xl font-sora text-xs font-semibold text-white">✅ Pago confirmado</button>
                    </div>
                    <p className="text-center font-sora text-[10px] text-gray-400">El cliente puede pagar con Nequi, Daviplata, Bold, PSE o cualquier app bancaria</p>
                  </div>
                </div>
              </div>
              <p className="font-sora text-xs text-acero mt-3 text-center">El QR aparece automáticamente al seleccionar el método — sin salir del sistema.</p>
            </motion.div>

            {/* Beneficios y configuración */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <div>
                <h3 className="font-sora font-bold text-grafito text-lg mb-4">Para el dueño — configuración en 2 minutos</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: '🔗', text: '**URL de pago:** pega el link de Nequi, Daviplata, Bold o cualquier pasarela — el sistema genera el QR automáticamente.' },
                    { icon: '🖼️', text: '**QR de imagen:** sube la imagen del QR que te dio tu banco o plataforma. Listo.' },
                    { icon: '✏️', text: 'Agrégale un nombre ("Nequi empresa") e instrucciones opcionales para el cajero.' },
                    { icon: '⚡', text: 'Se activa en todos los puntos de venta del negocio. Sin configuración técnica adicional.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3.5">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <p className="font-sora text-sm text-grafito leading-snug" dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-sora font-bold text-grafito text-lg mb-4">Ventajas para tu negocio</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '💸', title: 'Sin costo de datafono', desc: 'Usa lo que ya tienes — Nequi, Bold, Bancolombia.' },
                    { icon: '📋', title: 'Cobro trazable', desc: 'Cada pago digital queda en el historial con método exacto.' },
                    { icon: '⏱️', title: 'Menos de 30 seg', desc: 'Del producto al pago confirmado en un solo flujo.' },
                    { icon: '🏪', title: 'En todos los módulos', desc: 'POS, lavadero, parqueadero y restaurante.' },
                  ].map((b, i) => (
                    <div key={i} className="bg-azulTinte border border-azulStack/15 rounded-xl p-4">
                      <div className="text-2xl mb-1.5">{b.icon}</div>
                      <h4 className="font-sora font-semibold text-grafito text-sm leading-tight mb-1">{b.title}</h4>
                      <p className="font-sora text-xs text-acero leading-snug">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-grafito rounded-2xl px-5 py-4 flex items-center gap-3">
                <span className="text-2xl flex-shrink-0">🇨🇴</span>
                <p className="font-sora text-sm text-white/70 leading-snug">
                  <strong className="text-white">Diseñado para Colombia.</strong> Para el negocio que ya cobra con Nequi pero lo hace desde el celular personal del dueño. Ksmart360 lo convierte en un proceso profesional, rápido y trazable.
                </p>
              </div>
            </motion.div>
          </Section>

          {/* Plataformas compatibles */}
          <Section>
            <motion.div variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
              <p className="font-sora text-xs text-acero uppercase tracking-wider font-medium mb-4">Compatible con cualquier plataforma de pago digital</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['Nequi', 'Daviplata', 'Bold', 'Bancolombia', 'PSE', 'Wompi', 'PayU', 'Tu banco'].map((p, i) => (
                  <span key={i} className={`font-sora text-sm font-semibold px-4 py-2 rounded-xl border ${i === 7 ? 'border-dashed border-gray-200 text-gray-300' : 'bg-gray-50 border-gray-100 text-grafito'}`}>{p}</span>
                ))}
              </div>
              <p className="font-sora text-xs text-acero mt-4">✓ Incluido en el plan Trial gratuito y en todos los planes de pago — sin costo adicional.</p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Capacidades completas ── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Todo incluido
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              60+ funcionalidades.<br className="hidden lg:block" />
              <span className="text-azulStack"> Un solo sistema.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-xl mx-auto leading-relaxed">
              Nada de módulos por separado. Nada de integraciones costosas. Todo lo que tu negocio necesita, desde el primer día.
            </motion.p>
          </Section>

          <Section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pymeCapabilities.map((cat, i) => {
              const colors = {
                blue:   { bg: 'bg-blue-50',   border: 'border-blue-100',   tag: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-400' },
                green:  { bg: 'bg-green-50',  border: 'border-green-100',  tag: 'bg-green-100 text-green-700', dot: 'bg-green-400' },
                purple: { bg: 'bg-purple-50', border: 'border-purple-100', tag: 'bg-purple-100 text-purple-700', dot: 'bg-purple-400' },
                orange: { bg: 'bg-orange-50', border: 'border-orange-100', tag: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' },
                teal:   { bg: 'bg-teal-50',   border: 'border-teal-100',   tag: 'bg-teal-100 text-teal-700',   dot: 'bg-teal-400' },
                pink:   { bg: 'bg-pink-50',   border: 'border-pink-100',   tag: 'bg-pink-100 text-pink-700',   dot: 'bg-pink-400' },
              };
              const c = colors[cat.color];
              return (
                <motion.div key={i} variants={fadeUp} className={`rounded-2xl border p-6 ${c.bg} ${c.border}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <h3 className="font-sora font-bold text-sm text-grafito tracking-tight">{cat.category}</h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-grafito/30 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="font-sora text-sm text-grafito/70 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </Section>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="py-24 lg:py-32 bg-grafito overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-azul/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azul bg-azul/10 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Así de fácil
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight">
              Listo para operar<br className="hidden lg:block" />
              <span className="text-azul"> en el mismo día.</span>
            </motion.h2>
          </Section>

          <Section className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {pymeSteps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="relative">
                {i < pymeSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-px bg-white/10 z-10" style={{ left: 'calc(100% + 1px)', width: 'calc(2rem - 2px)' }} />
                )}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full flex flex-col hover:border-azul/30 hover:bg-white/8 transition-all duration-300">
                  <div className="font-mono text-5xl font-bold text-azul/70 mb-4 leading-none">{s.step}</div>
                  <h3 className="font-sora font-bold text-white text-lg mb-3 tracking-tight">{s.title}</h3>
                  <p className="font-sora text-sm text-white/70 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <span className="font-mono text-[11px] text-azul/80 tracking-wider">{s.detail}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </Section>

          <Section className="mt-12 text-center">
            <motion.div variants={fadeUp}>
              <button
                onClick={() => window.open('https://www.appjeylor.com/', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors font-sora shadow-lg shadow-azul/30 cursor-pointer"
              >
                Empezar gratis ahora
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <p className="font-sora text-xs text-white/30 mt-3">14 días gratis · Sin tarjeta · Cancela cuando quieras</p>
            </motion.div>
          </Section>
        </div>
      </section>
    </>
  );
}

const techIntegrations = [
  { name: 'DIAN', icon: '🏛️', desc: 'Facturación electrónica UBL 2.1 vía proveedor habilitado. CUFE, QR y firma digital en cada factura.' },
  { name: 'Wompi', icon: '💳', desc: 'Pasarela de pagos colombiana. Tarjeta, débito y PSE. Activación de plan automática vía webhook.' },
  { name: 'WhatsApp', icon: '💬', desc: 'Cobros, recibos, recordatorios y catálogo virtual. Sin apps adicionales ni APIs de terceros.' },
  { name: 'Bases globales', icon: '🌍', desc: 'Auto-completado de productos desde OpenFoodFacts y UPCitemdb al escanear cualquier código.' },
  { name: 'WebAuthn / FIDO2', icon: '👆', desc: 'Estándar internacional de autenticación biométrica — el mismo que usan Google, Apple y los bancos.' },
  { name: 'OpenAPI / Swagger', icon: '📖', desc: 'Documentación automática de todos los endpoints. Siempre actualizada, siempre consistente con el código.' },
];

const techApiMetrics = [
  { label: '200+', desc: 'Endpoints REST' },
  { label: '< 200ms', desc: 'Respuesta promedio' },
  { label: 'Pydantic v2', desc: 'Validación estricta' },
  { label: 'OpenAPI', desc: 'Docs automáticas' },
  { label: 'REST v1', desc: 'Versionado desde día 1' },
  { label: 'Rate limiting', desc: 'Anti-abuso integrado' },
];

const techCompliance = [
  { icon: '🧾', title: 'Facturación DIAN', desc: 'Resolución, prefijo, rango, CUFE y QR según normativa vigente UBL 2.1.' },
  { icon: '📒', title: 'PUC colombiano', desc: 'Contabilidad automática alineada al Plan Único de Cuentas para pequeñas empresas.' },
  { icon: '💰', title: 'IVA colombiano', desc: 'Tarifas 0%, 5% y 19% con separación automática de IVA generado y descontable.' },
  { icon: '🔢', title: 'Formato moneda', desc: 'Pesos con punto como separador de miles y coma para decimales ($1.250.000,50).' },
  { icon: '🪪', title: 'NIT y documentos', desc: 'Validación de dígito verificador y todos los tipos de ID colombianos.' },
  { icon: '📋', title: 'Retención en la fuente', desc: 'Cuentas contables disponibles en el PUC predefinido del sistema.' },
];

// ─── Tech View ────────────────────────────────────────────────────────────────

function TechView() {
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <>
      {/* ── Features ── */}
      <section id="modulos" className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Funcionalidades
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Todo lo que tu empresa necesita.<br className="hidden lg:block" />
              <span className="text-azulStack"> Un solo sistema.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-xl mx-auto leading-relaxed">
              Sin módulos por separado. Sin instalaciones. Accede desde el navegador a todo lo que necesitas para operar.
            </motion.p>
          </Section>

          <Section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techFeatures.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-azulStack/30 hover:shadow-lg hover:shadow-azulStack/5 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="font-sora font-semibold text-base text-grafito mb-2 tracking-tight">{f.title}</h3>
                <p className="font-sora text-xs text-acero leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Mercado objetivo
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Un sistema. <span className="text-azulStack">Cinco industrias.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-xl mx-auto leading-relaxed">
              Al registrarte, el sistema detecta el perfil de tu negocio y activa exactamente los módulos que necesitas. Sin configuración manual.
            </motion.p>
          </Section>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {techIndustries.map((ind, i) => (
              <button
                key={i}
                onClick={() => setActiveIndustry(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-sora transition-all duration-200 ${
                  activeIndustry === i
                    ? 'bg-azulStack text-white shadow-md shadow-azulStack/25'
                    : 'bg-gray-50 text-acero hover:bg-gray-100'
                }`}
              >
                <span>{ind.icon}</span>
                {ind.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-papel border border-gray-100 rounded-2xl p-8 lg:p-10"
            >
              <div className="flex items-start gap-5 mb-8">
                <div className="text-5xl">{techIndustries[activeIndustry].icon}</div>
                <div>
                  <h3 className="font-sora font-bold text-2xl text-grafito tracking-tight">{techIndustries[activeIndustry].name}</h3>
                  <p className="font-sora text-sm text-acero mt-1">{techIndustries[activeIndustry].subtitle}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {techIndustries[activeIndustry].modules.map((mod, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <span className="w-5 h-5 bg-azulTinte rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#2E68E6" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="font-sora text-sm text-grafito leading-tight">{mod}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Cloud + multi-device ── */}
      <section className="py-24 lg:py-32 bg-grafito overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-azul/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azul bg-azul/10 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              SaaS · En la nube
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight">
              Sin servidores propios.<br className="hidden lg:block" />
              <span className="text-azul"> Sin instalaciones. Sin límites.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-white/50 mt-4 max-w-2xl mx-auto leading-relaxed">
              Ksmart360 corre 100% en la nube. No hay software que instalar, no hay versiones que actualizar, no hay servidor que mantener. Tu equipo accede desde cualquier dispositivo con un navegador — y obtiene exactamente las mismas funcionalidades, en la misma cuenta, en tiempo real.
            </motion.p>
          </Section>

          {/* Device diagram */}
          <Section>
            <motion.div variants={fadeUp} className="flex justify-center mb-10">
              <svg viewBox="0 0 560 220" fill="none" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
                {/* Center cloud */}
                <rect x="200" y="30" width="160" height="80" rx="18" fill="#2E68E6" fillOpacity="0.12" stroke="#2E68E6" strokeWidth="1.5" strokeOpacity="0.5"/>
                <text x="280" y="62" textAnchor="middle" fontSize="22" fill="#1ec8e0">☁</text>
                <text x="280" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="sans-serif">Ksmart360</text>
                <text x="280" y="97" textAnchor="middle" fontSize="9" fill="#6A6F7E" fontFamily="monospace">Cloud · Oracle OCI</text>

                {/* Lines */}
                <line x1="200" y1="70" x2="118" y2="120" stroke="#2E68E6" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4"/>
                <line x1="280" y1="110" x2="280" y2="145" stroke="#2E68E6" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4"/>
                <line x1="360" y1="70" x2="442" y2="120" stroke="#2E68E6" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4"/>

                {/* Phone */}
                <rect x="78" y="120" width="40" height="68" rx="7" fill="#0D0F16" stroke="#6A6F7E" strokeWidth="1.2"/>
                <rect x="84" y="128" width="28" height="44" rx="3" fill="#2E68E6" fillOpacity="0.15"/>
                <rect x="90" y="192" width="16" height="3" rx="1.5" fill="#6A6F7E" fillOpacity="0.5"/>
                <text x="98" y="215" textAnchor="middle" fontSize="10" fill="#6A6F7E" fontFamily="sans-serif">Celular</text>

                {/* Tablet */}
                <rect x="230" y="145" width="100" height="68" rx="8" fill="#0D0F16" stroke="#6A6F7E" strokeWidth="1.2"/>
                <rect x="238" y="152" width="84" height="48" rx="3" fill="#2E68E6" fillOpacity="0.15"/>
                <circle cx="280" cy="207" r="3" fill="#6A6F7E" fillOpacity="0.5"/>
                <text x="280" y="225" textAnchor="middle" fontSize="10" fill="#6A6F7E" fontFamily="sans-serif">Tablet</text>

                {/* Laptop */}
                <rect x="402" y="120" width="100" height="64" rx="6" fill="#0D0F16" stroke="#6A6F7E" strokeWidth="1.2"/>
                <rect x="410" y="127" width="84" height="44" rx="3" fill="#2E68E6" fillOpacity="0.15"/>
                <rect x="388" y="184" width="128" height="6" rx="3" fill="#6A6F7E" fillOpacity="0.4"/>
                <text x="452" y="207" textAnchor="middle" fontSize="10" fill="#6A6F7E" fontFamily="sans-serif">Computador</text>
              </svg>
            </motion.div>

            <motion.div variants={fadeUp} className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: '📱', title: 'Celular y tablet', desc: 'POS táctil, catálogo, cobros, ruta de cobro GPS. 100% funcional desde cualquier smartphone Android o iOS.' },
                { icon: '💻', title: 'Computador', desc: 'POS clásico con teclado y lector USB, reportes, configuración, administración. Mismo sistema, pantalla mayor.' },
                { icon: '🔄', title: 'Sincronización inmediata', desc: 'Un cajero vende desde el celular y el administrador ve el reporte actualizado en su computador al instante.' },
              ].map((d, i) => (
                <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-5">
                  <div className="text-3xl mb-3">{d.icon}</div>
                  <h3 className="font-sora font-semibold text-white text-sm mb-1.5">{d.title}</h3>
                  <p className="font-sora text-xs text-white/45 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Stack técnico
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Ingeniería de <span className="text-azulStack">nivel enterprise</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-xl mx-auto leading-relaxed">
              Multi-tenant SaaS sobre Oracle Cloud ARM. Un solo backend atiende N empresas simultáneamente con datos completamente aislados a nivel lógico.
            </motion.p>
          </Section>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* <Section>
              <motion.h3 variants={fadeUp} className="font-sora font-semibold text-grafito text-lg mb-6">Stack tecnológico</motion.h3>
              <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {techStack.map((t, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-azulStack/30 transition-colors">
                    <div className="font-sora font-semibold text-grafito text-sm">{t.label}</div>
                    <div className="font-sora text-xs text-acero mt-0.5">{t.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </Section> */}

            <Section>
              <motion.h3 variants={fadeUp} className="font-sora font-semibold text-grafito text-lg mb-6">Stack tecnológico</motion.h3>
              <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {techStack.map((t, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-azulStack/30 hover:shadow-sm transition-all duration-300 flex items-center gap-3"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: t.color + '18', border: `1px solid ${t.color}35` }}
                    >
                      {t.svg}
                    </div>
                    <div>
                      <div className="font-sora font-semibold text-grafito text-sm leading-tight">{t.label}</div>
                      <div className="font-sora text-xs text-acero mt-0.5">{t.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>

            <Section>
              <motion.h3 variants={fadeUp} className="font-sora font-semibold text-grafito text-lg mb-6">Seguridad en capas</motion.h3>
              <motion.div variants={stagger} className="flex flex-col gap-3">
                {security.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <span className="text-xl flex-shrink-0">{s.icon}</span>
                    <div>
                      <div className="font-sora font-semibold text-grafito text-sm">{s.title}</div>
                      <div className="font-sora text-xs text-acero leading-relaxed mt-0.5">{s.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </div>

          {/* Oracle Cloud */}
          <Section>
            <motion.div variants={fadeUp} className="bg-grafito rounded-2xl p-8 lg:p-10 mb-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🏛️</span>
                    <span className="font-sora font-bold text-white text-xl">Oracle Cloud Infrastructure</span>
                  </div>
                  <p className="font-sora text-sm text-white/50 leading-relaxed max-w-2xl">
                    La misma infraestructura que usan bancos, gobiernos y corporaciones Fortune 500. Oracle Cloud es el proveedor elegido por empresas que no pueden permitirse fallas — con SLAs de disponibilidad entre los más altos de la industria. Ksmart360 opera sobre esta plataforma para garantizar continuidad total del negocio: monitoreo activo 24/7, reinicio automático ante cualquier interrupción y backups automáticos diarios con retención de múltiples puntos de restauración. Tu operación no se detiene.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-green-400">Sistema activo · 99.9% uptime</span>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Integraciones nativas ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Integraciones
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Conectado con el<br className="hidden lg:block" />
              <span className="text-azulStack"> ecosistema colombiano.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-xl mx-auto leading-relaxed">
              Ksmart360 no vive en una burbuja. Está integrado de forma nativa con los servicios que ya usa tu negocio y con las entidades que lo regulan.
            </motion.p>
          </Section>

          <Section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {techIntegrations.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-papel border border-gray-100 rounded-2xl p-6 hover:border-azulStack/30 hover:shadow-lg hover:shadow-azulStack/5 transition-all duration-300">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-sora font-bold text-sm text-grafito mb-2">{t.name}</h3>
                <p className="font-sora text-xs text-acero leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </Section>

          {/* API metrics */}
          <Section>
            <motion.div variants={fadeUp} className="bg-grafito rounded-2xl p-8 lg:p-10">
              <div className="mb-6">
                <h3 className="font-sora font-bold text-white text-xl mb-2">Una API robusta detrás de cada acción</h3>
                <p className="font-sora text-sm text-white/50 leading-relaxed max-w-2xl">
                  Cada función que ves en pantalla es el resultado de una API RESTful versionada, documentada automáticamente y diseñada para responder en milisegundos. Más de 200 endpoints organizados por dominio de negocio, con esquemas de validación estrictos y respuestas predecibles.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {techApiMetrics.map((m, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-3 py-4 text-center">
                    <div className="font-mono font-bold text-azul text-sm mb-1">{m.label}</div>
                    <div className="font-sora text-xs text-white/35 leading-tight">{m.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Cumplimiento normativo ── */}
      <section className="py-24 lg:py-32 bg-grafito overflow-hidden relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[300px] bg-azul/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azul bg-azul/10 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Normativa
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight">
              Construido para<br className="hidden lg:block" />
              <span className="text-azul"> el mercado colombiano.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-white/50 mt-4 max-w-xl mx-auto leading-relaxed">
              Ksmart360 no es un sistema extranjero adaptado — fue diseñado desde cero para la realidad tributaria, comercial y operativa de Colombia.
            </motion.p>
          </Section>

          <Section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {techCompliance.map((c, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 bg-white/5 border border-white/8 rounded-2xl p-5">
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div>
                  <h3 className="font-sora font-semibold text-white text-sm mb-1">{c.title}</h3>
                  <p className="font-sora text-xs text-white/45 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </Section>

          {/* CI/CD y escala */}
          <Section>
            <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/8 rounded-2xl p-7">
                <h3 className="font-sora font-bold text-white text-lg mb-3">El sistema mejora solo</h3>
                <p className="font-sora text-sm text-white/50 leading-relaxed mb-4">
                  Con Ksmart360 no compras una versión que envejece — accedes a un sistema que se actualiza continuamente. Cada mejora llega automáticamente a tu cuenta sin que hagas nada: sin descargas, sin instalaciones, sin ventanas de mantenimiento, sin costos adicionales por actualizaciones.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['CI/CD automático', 'Migraciones sin downtime', 'Sin reinstalaciones', 'Sin costos de upgrade'].map((t, i) => (
                    <span key={i} className="font-mono text-[10px] text-azul bg-azul/10 border border-azul/20 px-2 py-1 rounded-lg">{t}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl p-7">
                <h3 className="font-sora font-bold text-white text-lg mb-3">Diseñado para crecer contigo</h3>
                <p className="font-sora text-sm text-white/50 leading-relaxed mb-4">
                  Sin estado en el servidor — cada request es independiente. Multi-tenant eficiente: una instancia atiende N empresas sin que una afecte a otra. PostgreSQL 17 con soporte para millones de transacciones. Frontend en CDN global — la UI carga desde el servidor más cercano al usuario.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Stateless backend', 'Multi-tenant nativo', 'CDN global', 'PostgreSQL 17'].map((t, i) => (
                    <span key={i} className="font-mono text-[10px] text-azul bg-azul/10 border border-azul/20 px-2 py-1 rounded-lg">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Ksmart360Page() {
  const [view, setView] = useState('pymes');

  return (
    <div className="min-h-screen bg-papel text-grafito">

      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-grafito/80 backdrop-blur-md border-b border-white/5">
        {/* Main row */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-3">
          {/* Left: back + logo */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm font-sora font-medium flex-shrink-0">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Inicio</span>
            </Link>
            <div className="w-px h-4 bg-white/10 flex-shrink-0" />
            <div className="flex items-center gap-2 min-w-0">
              <img src="/ksmart360-logo.svg" alt="Ksmart360" className="w-6 h-6 flex-shrink-0" />
              <span className="font-sora font-bold text-white text-sm flex-shrink-0">Ksmart360</span>
              <span className="font-mono text-[10px] text-white/30 hidden md:inline flex-shrink-0">v2.2.0</span>
            </div>
          </div>

          {/* Center toggle — desktop only */}
          <div className="hidden sm:flex items-center gap-1 bg-white/8 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setView('pymes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sora transition-all duration-200 whitespace-nowrap cursor-pointer ${
                view === 'pymes' ? 'bg-white text-grafito shadow-sm' : 'text-white/50 hover:text-white/80'
              }`}
            >
              Para mi negocio
            </button>
            <button
              onClick={() => setView('tech')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sora transition-all duration-200 whitespace-nowrap cursor-pointer ${
                view === 'tech' ? 'bg-white text-grafito shadow-sm' : 'text-white/50 hover:text-white/80'
              }`}
            >
              Técnico
            </button>
          </div>

          {/* Right: CTA */}
          <button
            onClick={() => window.open('https://www.appjeylor.com/', '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-azul text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors font-sora flex-shrink-0 cursor-pointer"
          >
            Probar gratis
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Toggle row — mobile only */}
        <div className="sm:hidden px-4 pb-2">
          <div className="flex items-center gap-1 bg-white/8 border border-white/10 rounded-xl p-1 w-full">
            <button
              onClick={() => setView('pymes')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold font-sora transition-all duration-200 cursor-pointer ${
                view === 'pymes' ? 'bg-white text-grafito shadow-sm' : 'text-white/50'
              }`}
            >
              Para mi negocio
            </button>
            <button
              onClick={() => setView('tech')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold font-sora transition-all duration-200 cursor-pointer ${
                view === 'tech' ? 'bg-white text-grafito shadow-sm' : 'text-white/50'
              }`}
            >
              Técnico
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative bg-grafito pt-36 pb-24 sm:pt-32 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-azul/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center">

            <motion.div variants={fadeUp} className="mb-8">
              <img src="/ksmart360-logo.svg" alt="Ksmart360" className="w-24 h-24 mx-auto drop-shadow-2xl" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-azul/20 border border-azul/30 rounded-full text-xs font-mono text-azul font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-azul rounded-full animate-pulse" />
                ERP SaaS · Colombia · Oracle Cloud · v2.2.0
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-sora font-black text-5xl lg:text-7xl text-white leading-none tracking-tight mb-6">
              Ksmart<span className="text-azul">360</span>
            </motion.h1>

            <AnimatePresence mode="wait">
              {view === 'pymes' ? (
                <motion.div
                  key="pymes-hero-text"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center"
                >
                  <p className="font-sora text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed mb-4">
                    Tu negocio, ordenado. Desde el celular.
                  </p>
                  <p className="font-sora text-sm text-white/35 max-w-xl leading-relaxed mb-10">
                    Vende, cobra, controla tu inventario y envía recibos por WhatsApp — todo desde un solo sistema, sin instalaciones y sin complicaciones.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="tech-hero-text"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center"
                >
                  <p className="font-sora text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed mb-4">
                    La plataforma de gestión empresarial más completa para PYMEs colombianas.
                  </p>
                  <p className="font-sora text-sm text-white/35 max-w-xl leading-relaxed mb-10">
                    Ventas POS, inventario FEFO, producción BOM, parqueadero, lavadero, restaurante y facturación electrónica DIAN — todo en un solo sistema SaaS.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <button
                onClick={() => window.open('https://www.appjeylor.com/', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-2 px-7 py-4 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors duration-200 font-sora shadow-lg shadow-azul/30 cursor-pointer"
              >
                Probar gratis 14 días
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const id = view === 'tech' ? 'modulos' : 'diferenciales';
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold text-sm rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-sora cursor-pointer"
              >
                {view === 'pymes' ? 'Conocer más' : 'Ver módulos'}
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-sora font-black text-4xl text-white mb-1">{s.value}</div>
                  <div className="font-sora text-xs text-white/35 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-papel to-transparent pointer-events-none" />
      </section>

      {/* ── Toggled content ── */}
      <AnimatePresence mode="wait">
        {view === 'pymes' ? (
          <motion.div
            key="pymes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PymeView />
          </motion.div>
        ) : (
          <motion.div
            key="tech"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TechView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Plans (shared) ── */}
      <section id="diferenciales" className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Planes
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-grafito leading-tight tracking-tight">
              Empieza gratis. <span className="text-azulStack">Crece sin límites.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-acero mt-4 max-w-lg mx-auto leading-relaxed">
              14 días para probar todo el sistema sin restricciones. Sin tarjeta de crédito.
            </motion.p>
          </Section>

          {/* Filosofía + tabla de precios */}
          <Section className="mb-12">
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
              <div className="bg-azulTinte border border-azulStack/20 rounded-2xl p-6 mb-6 text-center">
                <p className="font-sora text-sm text-grafito leading-relaxed">
                  <span className="font-bold text-azulStack">Filosofía:</span> todas las funcionalidades del sistema están disponibles en ambos planes. La diferencia es el volumen de operación y la <strong>facturación electrónica DIAN</strong>.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-3 text-center text-xs font-sora font-semibold bg-gray-50 border-b border-gray-100">
                  <div className="py-3 px-4 text-left text-acero">Período</div>
                  <div className="py-3 px-4 text-azulStack">Básico</div>
                  <div className="py-3 px-4 text-azulStack">Pro</div>
                </div>
                <div className="grid grid-cols-3 text-center text-sm font-sora border-b border-gray-50">
                  <div className="py-3 px-4 text-left text-acero text-xs">Mensual</div>
                  <div className="py-3 px-4 font-semibold text-grafito">$29.900<span className="text-acero font-normal text-xs">/mes</span></div>
                  <div className="py-3 px-4 font-semibold text-grafito">$49.900<span className="text-acero font-normal text-xs">/mes</span></div>
                </div>
                <div className="grid grid-cols-3 text-center text-sm font-sora border-b border-gray-50 bg-gray-50/50">
                  <div className="py-3 px-4 text-left text-acero text-xs">Trimestral <span className="text-green-600 font-medium">−10%</span></div>
                  <div className="py-3 px-4 font-semibold text-grafito">$26.910<span className="text-acero font-normal text-xs">/mes</span></div>
                  <div className="py-3 px-4 font-semibold text-grafito">$44.910<span className="text-acero font-normal text-xs">/mes</span></div>
                </div>
                <div className="grid grid-cols-3 text-center text-sm font-sora">
                  <div className="py-3 px-4 text-left text-acero text-xs">Anual <span className="text-green-600 font-medium">−20%</span></div>
                  <div className="py-3 px-4 font-semibold text-grafito">$23.920<span className="text-acero font-normal text-xs">/mes</span></div>
                  <div className="py-3 px-4 font-semibold text-grafito">$39.920<span className="text-acero font-normal text-xs">/mes</span></div>
                </div>
              </div>
            </motion.div>
          </Section>

          <Section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  plan.highlight
                    ? 'bg-azulStack text-white shadow-2xl shadow-azulStack/25 lg:scale-105'
                    : 'bg-white border border-gray-100'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-grafito text-white text-xs font-semibold font-sora px-4 py-1.5 rounded-full whitespace-nowrap">
                      Más elegido
                    </span>
                  </div>
                )}
                <div className="text-3xl mb-3">{plan.icon}</div>
                <h3 className={`font-sora font-bold text-lg mb-1 ${plan.highlight ? 'text-white' : 'text-grafito'}`}>{plan.name}</h3>
                <div className={`font-sora font-black text-2xl mb-0.5 ${plan.highlight ? 'text-white' : 'text-grafito'}`}>{plan.price}</div>
                <div className={`font-sora text-xs font-medium mb-1 ${plan.highlight ? 'text-white/60' : 'text-acero'}`}>{plan.period}</div>
                {plan.priceNote && (
                  <div className={`font-sora text-[10px] mb-3 ${plan.highlight ? 'text-white/50' : 'text-green-600'}`}>{plan.priceNote}</div>
                )}
                {!plan.priceNote && <div className="mb-3" />}
                <p className={`font-sora text-xs leading-relaxed mb-5 ${plan.highlight ? 'text-white/70' : 'text-acero'}`}>{plan.description}</p>
                <ul className="flex flex-col gap-2 mb-7 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      {f.ok ? (
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-white/20' : 'bg-azulTinte'}`}>
                          <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke={plan.highlight ? 'white' : '#2E68E6'} strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                      ) : (
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-red-50">
                          <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                      <span className={`font-sora text-xs leading-tight ${f.ok ? (plan.highlight ? 'text-white/80' : 'text-grafito') : 'text-acero line-through'}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (plan.ctaHref.startsWith('http')) {
                      window.open(plan.ctaHref, '_blank', 'noopener,noreferrer');
                    } else {
                      window.location.href = plan.ctaHref;
                    }
                  }}
                  className={`w-full text-center py-3 rounded-xl font-sora font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    plan.highlight
                      ? 'bg-white text-azulStack hover:bg-gray-50'
                      : 'bg-azulStack text-white hover:bg-blue-600'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </Section>

          {/* ¿Por qué Pro? */}
          <Section className="mt-10">
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="font-sora text-sm text-grafito leading-relaxed">
                <span className="font-bold">¿Por qué Pro?</span> Solo si tu negocio está obligado a emitir factura electrónica ante la DIAN. Si no, el plan Básico tiene <strong>todo lo que necesitas</strong> — sin restricciones.{' '}
                <span className="text-azulStack font-medium">¿Facturas electrónicamente? Sí → Pro. No → Básico.</span>
              </p>
            </motion.div>
          </Section>

          <Section className="mt-6">
            <motion.p variants={fadeUp} className="text-center font-sora text-xs text-acero">
              Pagos procesados por <strong>Wompi (Bancolombia)</strong> — Tarjeta de crédito/débito, Nequi, PSE y QR.
            </motion.p>
          </Section>
        </div>
      </section>

      {/* ── Final CTA (shared) ── */}
      <section className="py-24 bg-grafito overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-azul/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Section>
            <motion.div variants={fadeUp} className="mb-6">
              <img src="/ksmart360-logo.svg" alt="Ksmart360" className="w-16 h-16 mx-auto drop-shadow-xl" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight mb-5">
              Empieza hoy.<br />
              <span className="text-azul">Sin tarjeta de crédito.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-white/50 leading-relaxed mb-10 max-w-lg mx-auto">
              14 días gratis con acceso a todos los módulos. Configura tu empresa en minutos con el wizard de primer arranque.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => window.open('https://www.appjeylor.com/', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors font-sora shadow-lg shadow-azul/30 cursor-pointer"
              >
                Probar Ksmart360 gratis
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded-xl hover:border-white/40 hover:bg-white/5 transition-all font-sora">
                Hablar con ventas
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-grafito border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="22" fill="#2E68E6"/>
              <rect x="20" y="22" width="60" height="14" rx="7" fill="white"/>
              <rect x="20" y="43" width="47" height="14" rx="7" fill="rgba(255,255,255,0.75)"/>
              <rect x="20" y="64" width="34" height="14" rx="7" fill="rgba(255,255,255,0.5)"/>
            </svg>
            <span className="font-sora text-sm text-white/40">Tech Stack Colombia S.A.S.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="font-sora text-xs text-white/30 hover:text-white/60 transition-colors">Inicio</Link>
            <a href="/#contacto" className="font-sora text-xs text-white/30 hover:text-white/60 transition-colors">Contacto</a>
            <a href="https://www.appjeylor.com/" target="_blank" rel="noopener noreferrer" className="font-sora text-xs text-azul hover:text-blue-400 transition-colors font-medium">appjeylor.com ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
