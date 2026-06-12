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
      'Acceso completo a todos los módulos',
      'Sin tarjeta de crédito requerida',
      'Expira automáticamente a los 14 días',
      'Wizard de configuración guiado',
      'Soporte incluido',
    ],
    cta: 'Empezar gratis',
    highlight: false,
    ctaHref: 'https://www.appjeylor.com/',
  },
  {
    name: 'Premium',
    icon: '✨',
    price: 'A consultar',
    period: 'mensual o anual',
    description: 'Para empresas que necesitan operar sin interrupciones.',
    features: [
      'Todos los módulos del plan Trial',
      'Sin límite de usuarios ni transacciones',
      'Activación automática vía Wompi',
      'Multi-sede y multi-empresa',
      'Reportes avanzados + export Excel/PDF',
      'Soporte prioritario',
    ],
    cta: 'Contactar ventas',
    highlight: true,
    ctaHref: '/#contacto',
  },
  {
    name: 'Vitalicio',
    icon: '♾️',
    price: 'Pago único',
    period: 'sin vencimiento',
    description: 'Para alianzas estratégicas y casos especiales.',
    features: [
      'Todos los beneficios Premium',
      'Sin pagos recurrentes',
      'Asignación por SuperAdmin',
      'Ideal para integradores o aliados',
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
    desc: 'Cada venta, compra, gasto o cobro genera automáticamente el asiento contable en partida doble, siguiendo el PUC colombiano. Diferencia caja de bancos sola, separa el IVA, y descompone capital e intereses en préstamos. El sistema lleva tu contabilidad en segundo plano mientras tú operas.',
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
      '**Diferencia caja y bancos sin que toques nada:** si el pago fue en efectivo, registra en Caja. Si fue por Nequi, Daviplata, transferencia o tarjeta, registra en Bancos. El IVA de cada venta se contabiliza en su cuenta separada (IVA por pagar), igual que el IVA descontable de tus compras. En los préstamos, cada cuota cobrada se descompone automáticamente entre recuperación de capital e ingresos por intereses.',
      '**¿Llevas tiempo operando y activaste el módulo tarde?** Sin problema. El sistema puede generar retroactivamente todos los asientos contables de tus transacciones anteriores con un solo clic — sin duplicados, sin trabajo manual. Tu contabilidad completa, al día, desde el primer día que registraste en el sistema.',
    ],
  },
];

const pymeSteps = [
  {
    step: '01',
    title: 'Regístrate en 2 minutos',
    desc: 'Elige tu tipo de negocio — tienda, parqueadero, lavadero, restaurante o prestamista. El sistema activa automáticamente los módulos que necesitas. Sin configuración técnica.',
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
  {
    icon: '💰',
    name: 'Prestamista',
    subtitle: 'Préstamos · Microcrédito · Cooperativas',
    headline: 'Tu cartera bajo control. Sin excusas ni olvidos.',
    benefits: [
      { icon: '🧮', text: 'Simulador integrado: calcula la cuota exacta antes de aprobar el préstamo' },
      { icon: '📅', text: 'La mora se calcula y acumula automáticamente cada día sin intervención' },
      { icon: '📍', text: 'Cobradores registran GPS y foto en cada visita desde su celular' },
      { icon: '💵', text: 'Abonos a capital que redistribuyen el saldo entre cuotas pendientes solos' },
      { icon: '🖨️', text: 'Recibo de pago generado al instante y enviado por WhatsApp al cliente' },
      { icon: '📊', text: 'Cartera con aging: ve quién te debe y cuántos días llevan sin pagar' },
    ],
  },
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

// ─── Tech view data ───────────────────────────────────────────────────────────

const techFeatures = [
  { emoji: '🛒', title: 'POS Dual Mode', description: 'Clásico (teclado + escáner) y Touch Mode táctil. Hasta 4 métodos de pago por factura. Cotizaciones que se convierten en venta con un clic. Programa de puntos integrado.' },
  { emoji: '📦', title: 'Inventario FEFO', description: 'Kardex por costo promedio ponderado. Lotes con fecha de vencimiento. Alertas automáticas de stock mínimo. Variantes por talla, color o capacidad.' },
  { emoji: '🏭', title: 'Producción BOM', description: 'Recetas con ingredientes, rendimiento y merma. Lotes de producción: materia prima → producto terminado. Rollup de costos automático.' },
  { emoji: '🛍️', title: 'Compras Inteligentes', description: 'Ítems libres sin catálogo para gastos ocasionales. Orden de ingreso preservado. OC en PDF automático. Soporte de centavos para evitar descuadres contables.' },
  { emoji: '💰', title: 'Cartera & Préstamos', description: 'Amortización automática. Interés de mora diario. Ruta de cobro con GPS y evidencia fotográfica. Aging de cuentas por cobrar.' },
  { emoji: '🧾', title: 'Facturación DIAN', description: 'Resoluciones, numeración automática, CUFE, XML/PDF. Integración Matias API. Campos tributarios completos. Modo pruebas y producción.' },
  { emoji: '📊', title: '9 Tipos de Reporte', description: 'Ventas, rentabilidad, IVA neto, P&L simplificado, kardex, CxC aging, productividad, préstamos y producción. Export a Excel y PDF.' },
  { emoji: '🌐', title: 'Catálogo Virtual', description: 'Tienda pública con URL única por empresa. Sincronización de stock automática. Pedidos directamente desde WhatsApp.' },
];

const techIndustries = [
  {
    icon: '🏪',
    name: 'Comercio ERP',
    subtitle: 'Retail · Mayorista · Ferretería · Distribuidora · Taller',
    modules: ['POS dual mode + escáner de barras', 'Inventario FEFO con lotes y alertas', 'Compras con ítems libres', 'Facturación electrónica DIAN', 'Producción BOM + transformación', 'Cartera CxC + fidelización', 'Catálogo virtual online', 'Cotizaciones → Factura'],
  },
  {
    icon: '💰',
    name: 'Prestamos',
    subtitle: 'Microfinanzas · Crédito informal · Cooperativas',
    modules: ['Simulador de amortización automático', 'Interés de mora calculado diariamente', 'Ruta de cobro con GPS y cámara', 'Evidencia fotográfica por cuota', 'Abono a capital y cuotas', 'PDF recibos por WhatsApp', 'Análisis de cartera aging'],
  },
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
  { label: 'React 18', desc: 'Frontend SPA' },
  { label: 'FastAPI', desc: 'Backend Python 3.11' },
  { label: 'PostgreSQL 17', desc: 'Base de datos' },
  { label: 'Oracle Cloud', desc: 'Infraestructura ARM' },
  { label: 'Pydantic v2', desc: 'Validación' },
  { label: 'SQLAlchemy', desc: 'ORM' },
  { label: 'Vercel CDN', desc: 'Frontend global' },
  { label: 'Nginx + SSL', desc: 'Proxy inverso' },
  { label: 'Wompi', desc: 'Pagos Colombia' },
  { label: 'DIAN / Matias', desc: 'Facturación electrónica' },
  { label: 'WebAuthn FIDO2', desc: 'Biométrico' },
  { label: 'WhatsApp API', desc: 'Notificaciones' },
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
                <div className="bg-white/5 border border-white/8 rounded-2xl p-7 h-full flex flex-col">
                  <div className="font-mono text-5xl font-bold text-white/10 mb-4 leading-none">{s.step}</div>
                  <h3 className="font-sora font-bold text-white text-lg mb-3 tracking-tight">{s.title}</h3>
                  <p className="font-sora text-sm text-white/50 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-5 pt-4 border-t border-white/8">
                    <span className="font-mono text-[10px] text-white/30 tracking-wider">{s.detail}</span>
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

      {/* ── Architecture ── */}
      <section className="py-24 lg:py-32 bg-grafito overflow-hidden relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-azul/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Section className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-block text-xs font-mono font-medium text-azul bg-azul/10 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Tecnología
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-sora font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight">
              Ingeniería de <span className="text-azul">nivel enterprise</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sora text-base text-white/50 mt-4 max-w-xl mx-auto leading-relaxed">
              Multi-tenant SaaS sobre Oracle Cloud ARM. Un solo backend atiende N empresas simultáneamente con datos completamente aislados.
            </motion.p>
          </Section>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Section>
              <motion.h3 variants={fadeUp} className="font-sora font-semibold text-white text-lg mb-6">Stack tecnológico</motion.h3>
              <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {techStack.map((t, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                    <div className="font-sora font-semibold text-white text-sm">{t.label}</div>
                    <div className="font-sora text-xs text-white/35 mt-0.5">{t.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>

            <Section>
              <motion.h3 variants={fadeUp} className="font-sora font-semibold text-white text-lg mb-6">Seguridad en capas</motion.h3>
              <motion.div variants={stagger} className="flex flex-col gap-3">
                {security.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                    <span className="text-xl flex-shrink-0">{s.icon}</span>
                    <div>
                      <div className="font-sora font-semibold text-white text-sm">{s.title}</div>
                      <div className="font-sora text-xs text-white/40 leading-relaxed mt-0.5">{s.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </div>

          <Section>
            <motion.div variants={fadeUp} className="bg-azul/10 border border-azul/25 rounded-2xl p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🏛️</span>
                    <span className="font-sora font-bold text-white text-xl">Oracle Cloud VM.Standard.A1.Flex</span>
                  </div>
                  <p className="font-sora text-sm text-white/50 leading-relaxed max-w-2xl">
                    La misma infraestructura que usan bancos y corporaciones Fortune 500. Servidor ARM Ampere con <strong className="text-white">4 OCPU · 24 GB RAM · 96 GB SSD</strong>, PostgreSQL 17 auto-hospedado, Nginx con SSL y CI/CD automático en cada push a GitHub.
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
                    Ventas POS, inventario FEFO, producción BOM, cartera, parqueadero, lavadero, restaurante y facturación electrónica DIAN — todo en un solo sistema SaaS.
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
          <Section className="text-center mb-16">
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

          <Section className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-azulStack text-white shadow-2xl shadow-azulStack/25 scale-105'
                    : 'bg-white border border-gray-100'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-grafito text-white text-xs font-semibold font-sora px-4 py-1.5 rounded-full">
                      Más elegido
                    </span>
                  </div>
                )}
                <div className="text-3xl mb-4">{plan.icon}</div>
                <h3 className={`font-sora font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-grafito'}`}>{plan.name}</h3>
                <div className={`font-sora font-black text-3xl mb-1 ${plan.highlight ? 'text-white' : 'text-grafito'}`}>{plan.price}</div>
                <div className={`font-sora text-xs font-medium mb-3 ${plan.highlight ? 'text-white/60' : 'text-acero'}`}>{plan.period}</div>
                <p className={`font-sora text-sm leading-relaxed mb-6 ${plan.highlight ? 'text-white/70' : 'text-acero'}`}>{plan.description}</p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-white/20' : 'bg-azulTinte'}`}>
                        <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke={plan.highlight ? 'white' : '#2E68E6'} strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className={`font-sora text-sm leading-tight ${plan.highlight ? 'text-white/80' : 'text-grafito'}`}>{f}</span>
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
                  className={`w-full text-center py-3.5 rounded-xl font-sora font-semibold text-sm transition-all duration-200 cursor-pointer ${
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

          <Section className="mt-10">
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
