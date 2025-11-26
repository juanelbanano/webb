// ============================================
// TECHLOG - Sistema de Gestion de Encomiendas
// Colombia Edition 2025
// ============================================

// <CHANGE> Ciudades de Colombia con barrios actualizados
const colombiaCities = {
  Bogota: {
    lat: 4.711,
    lng: -74.0721,
    barrios: [
      "Chapinero",
      "Usaquen",
      "Suba",
      "Kennedy",
      "Teusaquillo",
      "Santa Fe",
      "La Candelaria",
      "Fontibon",
      "Engativa",
      "Bosa",
      "Ciudad Bolivar",
      "Puente Aranda",
      "San Cristobal",
      "Rafael Uribe",
      "Antonio Narino",
      "Barrios Unidos",
      "Los Martires",
      "Tunjuelito",
    ],
  },
  Medellin: {
    lat: 6.2442,
    lng: -75.5812,
    barrios: [
      "El Poblado",
      "Laureles",
      "Belen",
      "Envigado",
      "Sabaneta",
      "La America",
      "Robledo",
      "Manrique",
      "Aranjuez",
      "Buenos Aires",
      "Castilla",
      "San Javier",
      "Guayabal",
      "El Estadio",
    ],
  },
  Cali: {
    lat: 3.4516,
    lng: -76.532,
    barrios: [
      "Granada",
      "San Fernando",
      "El Penon",
      "Ciudad Jardin",
      "Tequendama",
      "San Antonio",
      "Santa Monica",
      "Aguablanca",
      "Chipichape",
      "La Flora",
      "Centenario",
      "Normandia",
    ],
  },
  Barranquilla: {
    lat: 10.9685,
    lng: -74.7813,
    barrios: [
      "El Prado",
      "Alto Prado",
      "Villa Country",
      "Riomar",
      "Ciudad Jardin",
      "Boston",
      "Recreo",
      "La Cumbre",
      "Paraiso",
      "Los Andes",
    ],
  },
  Cartagena: {
    lat: 10.391,
    lng: -75.4794,
    barrios: [
      "Bocagrande",
      "Castillogrande",
      "Manga",
      "Getsemani",
      "Centro Historico",
      "Crespo",
      "La Boquilla",
      "Pie de la Popa",
      "El Laguito",
      "Torices",
    ],
  },
  Bucaramanga: {
    lat: 7.1254,
    lng: -73.1198,
    barrios: [
      "Cabecera del Llano",
      "Sotomayor",
      "La Floresta",
      "Cacique",
      "San Alonso",
      "Alarcon",
      "Provenza",
      "Lagos del Cacique",
      "Real de Minas",
    ],
  },
  Cucuta: {
    lat: 7.8939,
    lng: -72.5078,
    barrios: [
      "Caobos",
      "La Riviera",
      "Ceiba",
      "Centro",
      "Guaimaral",
      "El Salado",
      "San Luis",
      "Prados del Este",
      "Quinta Oriental",
    ],
  },
  Pereira: {
    lat: 4.8133,
    lng: -75.6961,
    barrios: [
      "Pinares",
      "Alamos",
      "Centro",
      "Cuba",
      "Circunvalar",
      "Los Alpes",
      "San Fernando",
      "Dosquebradas",
      "El Jardin",
    ],
  },
  "Santa Marta": {
    lat: 11.2408,
    lng: -74.199,
    barrios: [
      "El Rodadero",
      "Bello Horizonte",
      "Centro Historico",
      "Gaira",
      "Taganga",
      "Mamatoco",
      "Bavaria",
      "Los Almendros",
    ],
  },
  Ibague: {
    lat: 4.4389,
    lng: -75.2322,
    barrios: ["La Pola", "El Vergel", "Jordan", "Ambala", "Galan", "Centro", "Calarca", "Piedra Pintada", "San Simon"],
  },
  Villavicencio: {
    lat: 4.142,
    lng: -73.6266,
    barrios: [
      "Centro",
      "Barzal",
      "Popular",
      "La Esperanza",
      "Antonio Villavicencio",
      "Kirpas",
      "Porfias",
      "Siete de Agosto",
    ],
  },
  Manizales: {
    lat: 5.0703,
    lng: -75.5138,
    barrios: ["Palermo", "Chipre", "El Cable", "Centro", "La Enea", "San Marcel", "Versalles", "Milan", "La Sultana"],
  },
}

// Distancias entre ciudades de Colombia (en km)
const cityDistances = {
  "Bogota-Medellin": 440,
  "Bogota-Cali": 460,
  "Bogota-Barranquilla": 1000,
  "Bogota-Cartagena": 1040,
  "Bogota-Bucaramanga": 395,
  "Bogota-Cucuta": 560,
  "Bogota-Pereira": 340,
  "Bogota-Santa Marta": 950,
  "Bogota-Ibague": 200,
  "Bogota-Villavicencio": 120,
  "Bogota-Manizales": 290,
  "Medellin-Cali": 420,
  "Medellin-Barranquilla": 700,
  "Medellin-Cartagena": 640,
  "Medellin-Bucaramanga": 390,
  "Medellin-Pereira": 220,
  "Medellin-Manizales": 190,
  "Medellin-Santa Marta": 750,
  "Medellin-Ibague": 300,
  "Medellin-Cucuta": 550,
  "Cali-Pereira": 200,
  "Cali-Manizales": 250,
  "Cali-Bucaramanga": 600,
  "Cali-Ibague": 270,
  "Cali-Barranquilla": 950,
  "Cali-Cartagena": 900,
  "Barranquilla-Cartagena": 130,
  "Barranquilla-Santa Marta": 100,
  "Cartagena-Santa Marta": 230,
  "Bucaramanga-Cucuta": 200,
  "Pereira-Manizales": 50,
  "Pereira-Ibague": 130,
  "Ibague-Manizales": 150,
  "Villavicencio-Ibague": 280,
  "Villavicencio-Bucaramanga": 450,
}

// Velocidad promedio de transporte (km/h)
const AVERAGE_SPEED = 60

// Estados de las encomiendas con iconos y progreso
const parcelStatuses = {
  Procesando: { icon: "bi-hourglass-split", progress: 10, color: "info" },
  Recolectado: { icon: "bi-box-seam", progress: 25, color: "purple" },
  "En Transito": { icon: "bi-truck", progress: 50, color: "warning" },
  "En Reparto": { icon: "bi-bicycle", progress: 75, color: "pink" },
  Entregado: { icon: "bi-check-circle-fill", progress: 100, color: "success" },
}

// <CHANGE> Datos demo actualizados a 2025
let users = [
  { id: 1, name: "Administrador", email: "admin@techlog.com", password: "admin123", role: "admin" },
  { id: 2, name: "Usuario Demo", email: "user@demo.com", password: "demo123", role: "user" },
]

let parcels = [
  {
    id: 1,
    trackingCode: "TL-2025-0001",
    description: "Documentos importantes",
    sender: "Empresa ABC",
    recipient: "Juan Perez",
    origin: "Bogota",
    destination: "Medellin",
    destinationBarrio: "El Poblado",
    address: "Calle 10 #43-25, El Poblado",
    weight: 2.5,
    status: "En Transito",
    userId: 2,
    estimatedTime: "7h 20min",
    distance: 440,
    progress: 50,
    createdAt: "2025-01-15",
    routeHistory: [
      { location: "Bogota", lat: 4.711, lng: -74.0721, time: "15/01/2025 09:00", status: "Origen" },
      { location: "Tunja", lat: 5.5353, lng: -73.3678, time: "15/01/2025 11:30", status: "En transito" },
      { location: "En camino", lat: 5.9, lng: -74.2, time: "15/01/2025 14:00", status: "Ubicacion actual" },
    ],
    timeline: [
      { status: "Procesando", date: "15/01/2025 09:00", location: "Bogota - Centro de Operaciones" },
      { status: "Recolectado", date: "15/01/2025 11:00", location: "Bogota - Almacen Central Fontibon" },
      { status: "En Transito", date: "15/01/2025 14:00", location: "En camino a Medellin" },
    ],
  },
  {
    id: 2,
    trackingCode: "TL-2025-0002",
    description: "Equipo electronico",
    sender: "Tech Store",
    recipient: "Maria Garcia",
    origin: "Barranquilla",
    destination: "Cartagena",
    destinationBarrio: "Bocagrande",
    address: "Avenida San Martin #8-45, Bocagrande",
    weight: 1.2,
    status: "Entregado",
    userId: 2,
    estimatedTime: "2h 10min",
    distance: 130,
    progress: 100,
    createdAt: "2025-01-14",
    routeHistory: [
      { location: "Barranquilla", lat: 10.9685, lng: -74.7813, time: "14/01/2025 08:00", status: "Origen" },
      { location: "Cartagena", lat: 10.391, lng: -75.4794, time: "14/01/2025 10:30", status: "Destino" },
    ],
    timeline: [
      { status: "Procesando", date: "14/01/2025 08:00", location: "Barranquilla - Centro de Operaciones" },
      { status: "Recolectado", date: "14/01/2025 09:00", location: "Barranquilla - Almacen" },
      { status: "En Transito", date: "14/01/2025 09:30", location: "En camino a Cartagena" },
      { status: "En Reparto", date: "14/01/2025 11:00", location: "Cartagena - Centro de Distribucion" },
      { status: "Entregado", date: "14/01/2025 12:00", location: "Entregado en Bocagrande" },
    ],
  },
]

let currentUser = null
let currentFilter = "all"
let previewMap = null
let detailMap = null
let allRoutesMap = null

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function getDistance(origin, destination) {
  if (origin === destination) return 0

  const key1 = `${origin}-${destination}`
  const key2 = `${destination}-${origin}`

  return cityDistances[key1] || cityDistances[key2] || Math.floor(Math.random() * 500 + 200)
}

function calculateEstimatedTime(distance) {
  const hours = distance / AVERAGE_SPEED
  const totalMinutes = Math.round(hours * 60)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${h}h ${m.toString().padStart(2, "0")}min`
}

function generateTrackingCode() {
  const year = new Date().getFullYear()
  const num = String(parcels.length + 1).padStart(4, "0")
  return `TL-${year}-${num}`
}

function getStatusInfo(status) {
  return parcelStatuses[status] || parcelStatuses["Procesando"]
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
}

function getBarriosForCity(city) {
  return colombiaCities[city]?.barrios || []
}

function getCityCoordinates(city) {
  return colombiaCities[city] || { lat: 4.5709, lng: -74.2973 }
}

// ============================================
// AUTENTICACION
// ============================================

function login(email, password) {
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))
    return true
  }
  return false
}

function register(name, email, password) {
  if (users.find((u) => u.email === email)) {
    return false
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: "user",
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))
  return true
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  window.location.href = "index.html"
}

function checkAuth() {
  const stored = localStorage.getItem("currentUser")
  if (stored) {
    currentUser = JSON.parse(stored)
    return true
  }
  return false
}

// ============================================
// GESTION DE ENCOMIENDAS
// ============================================

function createParcel(data) {
  if (!currentUser) return false

  const distance = getDistance(data.origin, data.destination)
  const estimatedTime = calculateEstimatedTime(distance)
  const trackingCode = generateTrackingCode()

  const originCoords = getCityCoordinates(data.origin)
  const destCoords = getCityCoordinates(data.destination)

  // <CHANGE> Fecha formateada correctamente a 2025
  const now = new Date()
  const dateStr = now.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" })
  const timeStr = now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })

  const newParcel = {
    id: parcels.length + 1,
    trackingCode,
    description: data.description,
    sender: data.sender,
    recipient: data.recipient,
    origin: data.origin,
    destination: data.destination,
    destinationBarrio: data.destinationBarrio,
    address: data.address,
    weight: Number.parseFloat(data.weight),
    status: "Procesando",
    userId: currentUser.id,
    estimatedTime,
    distance,
    progress: 10,
    createdAt: now.toISOString().split("T")[0],
    routeHistory: [
      {
        location: data.origin,
        lat: originCoords.lat,
        lng: originCoords.lng,
        time: `${dateStr} ${timeStr}`,
        status: "Origen",
      },
    ],
    timeline: [
      {
        status: "Procesando",
        date: `${dateStr} ${timeStr}`,
        location: `${data.origin} - Centro de Operaciones`,
      },
    ],
  }

  parcels.push(newParcel)
  localStorage.setItem("parcels", JSON.stringify(parcels))
  return newParcel
}

function getUserParcels(filter = "all") {
  if (!currentUser) return []

  let userParcels = parcels.filter((p) => p.userId === currentUser.id)

  if (filter === "active") {
    userParcels = userParcels.filter((p) => p.status !== "Entregado")
  } else if (filter === "delivered") {
    userParcels = userParcels.filter((p) => p.status === "Entregado")
  }

  return userParcels.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

function getAllParcels() {
  return parcels.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

function getParcelById(id) {
  return parcels.find((p) => p.id === id)
}

function updateParcelStatus(parcelId, newStatus) {
  const parcel = parcels.find((p) => p.id === parcelId)
  if (parcel) {
    parcel.status = newStatus
    parcel.progress = parcelStatuses[newStatus].progress

    const now = new Date()
    const dateStr = now.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" })
    const timeStr = now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })

    const location = newStatus === "Entregado" ? `${parcel.destination}, ${parcel.destinationBarrio}` : parcel.origin

    parcel.timeline.push({
      status: newStatus,
      date: `${dateStr} ${timeStr}`,
      location: `${location} - Actualizado`,
    })

    // Actualizar historial de ruta
    if (newStatus === "Entregado") {
      const destCoords = getCityCoordinates(parcel.destination)
      parcel.routeHistory.push({
        location: parcel.destination,
        lat: destCoords.lat,
        lng: destCoords.lng,
        time: `${dateStr} ${timeStr}`,
        status: "Entregado",
      })
    }

    localStorage.setItem("parcels", JSON.stringify(parcels))
    return true
  }
  return false
}

// ============================================
// MAPAS CON LEAFLET
// ============================================

function initPreviewMap(origin, destination) {
  const mapContainer = document.getElementById("previewMap")
  if (!mapContainer) return

  // Destruir mapa existente si hay
  if (previewMap) {
    previewMap.remove()
    previewMap = null
  }

  const originCoords = getCityCoordinates(origin)
  const destCoords = getCityCoordinates(destination)

  // Calcular centro del mapa
  const centerLat = (originCoords.lat + destCoords.lat) / 2
  const centerLng = (originCoords.lng + destCoords.lng) / 2

  previewMap = L.map("previewMap").setView([centerLat, centerLng], 6)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(previewMap)

  // Marcador de origen
  const originIcon = L.divIcon({
    className: "custom-marker",
    html: '<div style="background: #1a56db; color: white; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="bi bi-geo-alt-fill"></i></div>',
    iconSize: [30, 30],
  })

  // Marcador de destino
  const destIcon = L.divIcon({
    className: "custom-marker",
    html: '<div style="background: #10b981; color: white; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="bi bi-flag-fill"></i></div>',
    iconSize: [30, 30],
  })

  L.marker([originCoords.lat, originCoords.lng], { icon: originIcon })
    .addTo(previewMap)
    .bindPopup(`<strong>Origen:</strong> ${origin}`)

  L.marker([destCoords.lat, destCoords.lng], { icon: destIcon })
    .addTo(previewMap)
    .bindPopup(`<strong>Destino:</strong> ${destination}`)

  // Linea del recorrido
  L.polyline(
    [
      [originCoords.lat, originCoords.lng],
      [destCoords.lat, destCoords.lng],
    ],
    {
      color: "#1a56db",
      weight: 3,
      dashArray: "10, 10",
    },
  ).addTo(previewMap)

  // Ajustar vista a los marcadores
  previewMap.fitBounds(
    [
      [originCoords.lat, originCoords.lng],
      [destCoords.lat, destCoords.lng],
    ],
    { padding: [30, 30] },
  )
}

function initDetailMap(parcel) {
  const mapContainer = document.getElementById("detailMap")
  if (!mapContainer) return

  const originCoords = getCityCoordinates(parcel.origin)
  const destCoords = getCityCoordinates(parcel.destination)

  // Calcular posicion actual basada en progreso
  const currentLat = originCoords.lat + (destCoords.lat - originCoords.lat) * (parcel.progress / 100)
  const currentLng = originCoords.lng + (destCoords.lng - originCoords.lng) * (parcel.progress / 100)

  const centerLat = (originCoords.lat + destCoords.lat) / 2
  const centerLng = (originCoords.lng + destCoords.lng) / 2

  if (detailMap) {
    detailMap.remove()
  }

  detailMap = L.map("detailMap").setView([centerLat, centerLng], 6)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(detailMap)

  // Iconos personalizados
  const originIcon = L.divIcon({
    className: "custom-marker",
    html: '<div style="background: #1a56db; color: white; padding: 10px; border-radius: 50%; font-size: 16px;"><i class="bi bi-geo-alt-fill"></i></div>',
    iconSize: [36, 36],
  })

  const destIcon = L.divIcon({
    className: "custom-marker",
    html: '<div style="background: #10b981; color: white; padding: 10px; border-radius: 50%; font-size: 16px;"><i class="bi bi-flag-fill"></i></div>',
    iconSize: [36, 36],
  })

  const truckIcon = L.divIcon({
    className: "custom-marker truck-pulse",
    html: '<div style="background: #f59e0b; color: white; padding: 10px; border-radius: 50%; font-size: 16px; animation: pulse 2s infinite;"><i class="bi bi-truck"></i></div>',
    iconSize: [40, 40],
  })

  // Marcadores
  L.marker([originCoords.lat, originCoords.lng], { icon: originIcon })
    .addTo(detailMap)
    .bindPopup(`<strong>Origen:</strong> ${parcel.origin}`)

  L.marker([destCoords.lat, destCoords.lng], { icon: destIcon })
    .addTo(detailMap)
    .bindPopup(`<strong>Destino:</strong> ${parcel.destination}<br><small>${parcel.destinationBarrio}</small>`)

  // Mostrar camion solo si no esta entregado
  if (parcel.progress < 100) {
    L.marker([currentLat, currentLng], { icon: truckIcon })
      .addTo(detailMap)
      .bindPopup(`<strong>Ubicacion actual</strong><br>Progreso: ${parcel.progress}%`)
  }

  // Linea completa (gris)
  L.polyline(
    [
      [originCoords.lat, originCoords.lng],
      [destCoords.lat, destCoords.lng],
    ],
    {
      color: "#cbd5e1",
      weight: 4,
    },
  ).addTo(detailMap)

  // Linea de progreso (verde)
  L.polyline(
    [
      [originCoords.lat, originCoords.lng],
      [currentLat, currentLng],
    ],
    {
      color: "#10b981",
      weight: 4,
    },
  ).addTo(detailMap)

  detailMap.fitBounds(
    [
      [originCoords.lat, originCoords.lng],
      [destCoords.lat, destCoords.lng],
    ],
    { padding: [40, 40] },
  )
}

// <CHANGE> Funcion para mostrar mapa de todos los recorridos (Admin)
function showAllRoutesMap() {
  const modal = new bootstrap.Modal(document.getElementById("allRoutesMapModal"))
  modal.show()

  // Esperar a que el modal se muestre completamente
  document.getElementById("allRoutesMapModal").addEventListener(
    "shown.bs.modal",
    () => {
      initAllRoutesMap()
    },
    { once: true },
  )
}

function initAllRoutesMap() {
  const mapContainer = document.getElementById("allRoutesMap")
  if (!mapContainer) return

  if (allRoutesMap) {
    allRoutesMap.remove()
  }

  // Centro de Colombia
  allRoutesMap = L.map("allRoutesMap").setView([4.5709, -74.2973], 6)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(allRoutesMap)

  const colors = ["#1a56db", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  parcels.forEach((parcel, index) => {
    const originCoords = getCityCoordinates(parcel.origin)
    const destCoords = getCityCoordinates(parcel.destination)
    const color = colors[index % colors.length]

    // Calcular posicion actual
    const currentLat = originCoords.lat + (destCoords.lat - originCoords.lat) * (parcel.progress / 100)
    const currentLng = originCoords.lng + (destCoords.lng - originCoords.lng) * (parcel.progress / 100)

    // Linea de ruta
    L.polyline(
      [
        [originCoords.lat, originCoords.lng],
        [destCoords.lat, destCoords.lng],
      ],
      {
        color: color,
        weight: 3,
        opacity: 0.7,
      },
    ).addTo(allRoutesMap)

    // Marcador de origen
    const originIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background: ${color}; color: white; padding: 6px; border-radius: 50%; font-size: 12px;"><i class="bi bi-geo-alt-fill"></i></div>`,
      iconSize: [24, 24],
    })

    L.marker([originCoords.lat, originCoords.lng], { icon: originIcon })
      .addTo(allRoutesMap)
      .bindPopup(`<strong>${parcel.trackingCode}</strong><br>Origen: ${parcel.origin}`)

    // Marcador de destino
    const destIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background: ${color}; color: white; padding: 6px; border-radius: 50%; font-size: 12px;"><i class="bi bi-flag-fill"></i></div>`,
      iconSize: [24, 24],
    })

    L.marker([destCoords.lat, destCoords.lng], { icon: destIcon })
      .addTo(allRoutesMap)
      .bindPopup(
        `<strong>${parcel.trackingCode}</strong><br>Destino: ${parcel.destination}<br>Barrio: ${parcel.destinationBarrio}`,
      )

    // Marcador de posicion actual si no esta entregado
    if (parcel.progress < 100) {
      const user = users.find((u) => u.id === parcel.userId)
      const truckIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: #f59e0b; color: white; padding: 8px; border-radius: 50%; font-size: 14px;"><i class="bi bi-truck"></i></div>`,
        iconSize: [32, 32],
      })

      L.marker([currentLat, currentLng], { icon: truckIcon })
        .addTo(allRoutesMap)
        .bindPopup(`
          <strong>${parcel.trackingCode}</strong><br>
          Usuario: ${user ? user.name : "Desconocido"}<br>
          Progreso: ${parcel.progress}%<br>
          Estado: ${parcel.status}
        `)
    }
  })
}

// ============================================
// RENDERIZADO UI
// ============================================

function updateStats() {
  const userParcels = getUserParcels()
  const delivered = userParcels.filter((p) => p.status === "Entregado").length
  const transit = userParcels.filter((p) => p.status === "En Transito" || p.status === "En Reparto").length
  const processing = userParcels.filter((p) => p.status === "Procesando" || p.status === "Recolectado").length

  document.getElementById("totalParcels").textContent = userParcels.length
  document.getElementById("deliveredParcels").textContent = delivered
  document.getElementById("pendingParcels").textContent = transit
  document.getElementById("processingParcels").textContent = processing

  // Stats de admin
  if (currentUser && currentUser.role === "admin") {
    document.getElementById("totalUsers").textContent = users.length
    document.getElementById("totalAllParcels").textContent = parcels.length
    document.getElementById("activeDeliveries").textContent = parcels.filter((p) => p.status !== "Entregado").length
  }
}

function renderParcels() {
  const container = document.getElementById("parcelsList")
  if (!container) return

  const userParcels = getUserParcels(currentFilter)

  if (userParcels.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        <i class="bi bi-box display-1 mb-3"></i>
        <h5>No hay encomiendas ${currentFilter === "active" ? "activas" : currentFilter === "delivered" ? "entregadas" : ""}</h5>
        <p>Crea una nueva encomienda para comenzar</p>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newParcelModal">
          <i class="bi bi-plus-lg me-2"></i>Nueva Encomienda
        </button>
      </div>
    `
    return
  }

  container.innerHTML = userParcels
    .map((parcel) => {
      const statusInfo = getStatusInfo(parcel.status)
      return `
      <div class="parcel-item" onclick="showParcelDetail(${parcel.id})">
        <div class="parcel-header">
          <div>
            <span class="parcel-id">${parcel.trackingCode}</span>
            <h6 class="mt-2 mb-1 fw-semibold">${parcel.description}</h6>
          </div>
          <span class="status-badge status-${parcel.status.toLowerCase().replace(" ", "")}">
            <i class="bi ${statusInfo.icon}"></i> ${parcel.status}
          </span>
        </div>
        <div class="parcel-details">
          <div class="parcel-detail">
            <i class="bi bi-geo-alt"></i>
            <span>${parcel.origin} → ${parcel.destination}</span>
          </div>
          <div class="parcel-detail">
            <i class="bi bi-clock"></i>
            <span>${parcel.estimatedTime}</span>
          </div>
          <div class="parcel-detail">
            <i class="bi bi-pin-map"></i>
            <span>${parcel.destinationBarrio || "N/A"}</span>
          </div>
          <div class="parcel-detail">
            <i class="bi bi-calendar"></i>
            <span>${formatDate(parcel.createdAt)}</span>
          </div>
        </div>
        <div class="mt-3">
          <div class="progress" style="height: 6px;">
            <div class="progress-bar bg-${statusInfo.color}" style="width: ${parcel.progress}%"></div>
          </div>
        </div>
      </div>
    `
    })
    .join("")
}

function showParcelDetail(parcelId) {
  const parcel = getParcelById(parcelId)
  if (!parcel) return

  const statusInfo = getStatusInfo(parcel.status)
  const content = document.getElementById("parcelDetailContent")

  content.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-5">
        <div class="d-flex align-items-center mb-4">
          <span class="parcel-id me-3">${parcel.trackingCode}</span>
          <span class="status-badge status-${parcel.status.toLowerCase().replace(" ", "")}">
            <i class="bi ${statusInfo.icon}"></i> ${parcel.status}
          </span>
        </div>
        
        <h5 class="fw-bold mb-3">${parcel.description}</h5>
        
        <div class="row g-3 mb-3">
          <div class="col-6">
            <div class="bg-light rounded-3 p-3">
              <small class="text-muted d-block">Remitente</small>
              <strong>${parcel.sender}</strong>
            </div>
          </div>
          <div class="col-6">
            <div class="bg-light rounded-3 p-3">
              <small class="text-muted d-block">Destinatario</small>
              <strong>${parcel.recipient}</strong>
            </div>
          </div>
        </div>
        
        <div class="bg-light rounded-3 p-3 mb-3">
          <small class="text-muted d-block">Direccion de Entrega</small>
          <strong>${parcel.address}</strong>
          <span class="badge bg-secondary ms-2">${parcel.destinationBarrio}</span>
        </div>
        
        <div class="row g-3">
          <div class="col-4">
            <div class="text-center">
              <small class="text-muted d-block">Peso</small>
              <strong>${parcel.weight} kg</strong>
            </div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <small class="text-muted d-block">Distancia</small>
              <strong>${parcel.distance} km</strong>
            </div>
          </div>
          <div class="col-4">
            <div class="text-center">
              <small class="text-muted d-block">Fecha</small>
              <strong>${formatDate(parcel.createdAt)}</strong>
            </div>
          </div>
        </div>
        
        <div class="estimated-time-card mt-4">
          <small class="text-muted">Tiempo Estimado de Entrega</small>
          <div class="time-display">${parcel.estimatedTime}</div>
          <div class="time-label">${parcel.origin} → ${parcel.destination}</div>
        </div>
      </div>
      
      <div class="col-lg-7">
        <!-- Mapa del recorrido -->
        <div class="card border-0 bg-light mb-4">
          <div class="card-header bg-transparent">
            <h6 class="mb-0"><i class="bi bi-map me-2"></i>Mapa del Recorrido</h6>
          </div>
          <div class="card-body p-2">
            <div id="detailMap" style="height: 280px; border-radius: 12px;"></div>
          </div>
        </div>
        
        <h6 class="fw-bold mb-3"><i class="bi bi-clock-history me-2"></i>Historial de Seguimiento</h6>
        <div class="tracking-timeline" style="max-height: 200px; overflow-y: auto;">
          ${parcel.timeline
            .map((item, index) => {
              const itemStatusInfo = getStatusInfo(item.status)
              const isLast = index === parcel.timeline.length - 1
              return `
              <div class="timeline-item">
                <div class="timeline-dot ${isLast ? "active" : "completed"}">
                  <i class="bi ${itemStatusInfo.icon}"></i>
                </div>
                <div class="timeline-content">
                  <h6 class="mb-1">${item.status}</h6>
                  <small class="text-muted">${item.date}</small>
                  <small class="d-block text-muted"><i class="bi bi-geo-alt me-1"></i>${item.location}</small>
                </div>
              </div>
            `
            })
            .join("")}
        </div>
      </div>
    </div>
  `

  const modal = new bootstrap.Modal(document.getElementById("parcelDetailModal"))
  modal.show()

  // Inicializar mapa despues de mostrar modal
  document.getElementById("parcelDetailModal").addEventListener(
    "shown.bs.modal",
    () => {
      initDetailMap(parcel)
    },
    { once: true },
  )
}

function filterParcels(filter) {
  currentFilter = filter

  // Actualizar botones activos
  document.querySelectorAll(".btn-group .btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  renderParcels()
}

function renderActivity() {
  const container = document.getElementById("activityList")
  if (!container) return

  const userParcels = getUserParcels().slice(0, 5)

  if (userParcels.length === 0) {
    container.innerHTML = '<div class="text-center py-3 text-muted"><small>Sin actividad reciente</small></div>'
    return
  }

  container.innerHTML = userParcels
    .map((parcel) => {
      const lastEvent = parcel.timeline[parcel.timeline.length - 1]
      const statusInfo = getStatusInfo(lastEvent.status)
      return `
      <div class="timeline-item">
        <div class="timeline-dot ${parcel.status === "Entregado" ? "completed" : "active"}">
          <i class="bi ${statusInfo.icon}"></i>
        </div>
        <div class="timeline-content">
          <h6 class="mb-0">${parcel.trackingCode}</h6>
          <small class="text-muted">${lastEvent.status} - ${lastEvent.date}</small>
        </div>
      </div>
    `
    })
    .join("")
}

// ============================================
// FUNCIONES DE ADMIN
// ============================================

function toggleAdminView() {
  const section = document.getElementById("adminAllParcelsSection")
  section.style.display = section.style.display === "none" ? "block" : "none"

  if (section.style.display === "block") {
    renderAdminParcelsTable()
  }
}

function hideAdminView() {
  document.getElementById("adminAllParcelsSection").style.display = "none"
}

function renderAdminParcelsTable() {
  const tbody = document.getElementById("adminParcelsTable")
  const allParcels = getAllParcels()

  tbody.innerHTML = allParcels
    .map((parcel) => {
      const user = users.find((u) => u.id === parcel.userId)
      const statusInfo = getStatusInfo(parcel.status)
      return `
      <tr>
        <td><span class="parcel-id">${parcel.trackingCode}</span></td>
        <td>
          <div class="d-flex align-items-center">
            <div class="user-avatar-small me-2">${user ? user.name.charAt(0).toUpperCase() : "?"}</div>
            <div>
              <span class="d-block fw-semibold">${user ? user.name : "Desconocido"}</span>
              <small class="text-muted">${user ? user.email : ""}</small>
            </div>
          </div>
        </td>
        <td>${parcel.origin}</td>
        <td>
          <span>${parcel.destination}</span>
          <small class="d-block text-muted">${parcel.destinationBarrio || ""}</small>
        </td>
        <td>
          <span class="status-badge status-${parcel.status.toLowerCase().replace(" ", "")}">
            <i class="bi ${statusInfo.icon}"></i> ${parcel.status}
          </span>
        </td>
        <td>
          <span class="text-success fw-bold">${parcel.estimatedTime}</span>
          <small class="d-block text-muted">${parcel.distance} km</small>
        </td>
        <td><small>${formatDate(parcel.createdAt)}</small></td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="showParcelDetail(${parcel.id})" title="Ver detalles">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-warning" onclick="openEditStatusModal(${parcel.id})" title="Editar estado">
            <i class="bi bi-pencil"></i>
          </button>
        </td>
      </tr>
    `
    })
    .join("")
}

function openEditStatusModal(parcelId) {
  const parcel = getParcelById(parcelId)
  if (!parcel) return

  document.getElementById("editParcelId").value = parcel.id
  document.getElementById("editParcelCode").value = parcel.trackingCode
  document.getElementById("editStatus").value = parcel.status

  const modal = new bootstrap.Modal(document.getElementById("editStatusModal"))
  modal.show()
}

function updateBarriosSelect(citySelectId, barrioSelectId) {
  const citySelect = document.getElementById(citySelectId)
  const barrioSelect = document.getElementById(barrioSelectId)

  if (!citySelect || !barrioSelect) return

  const selectedCity = citySelect.value
  const barrios = getBarriosForCity(selectedCity)

  barrioSelect.innerHTML = '<option value="">Seleccionar barrio...</option>'
  barrios.forEach((barrio) => {
    barrioSelect.innerHTML += `<option value="${barrio}">${barrio}</option>`
  })
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos del localStorage
  const storedUsers = localStorage.getItem("users")
  if (storedUsers) {
    users = JSON.parse(storedUsers)
  }

  const storedParcels = localStorage.getItem("parcels")
  if (storedParcels) {
    parcels = JSON.parse(storedParcels)
  }

  // Verificar autenticacion en dashboard
  if (window.location.pathname.includes("dashboard.html")) {
    if (!checkAuth()) {
      window.location.href = "login.html"
      return
    }

    document.getElementById("userName").textContent = currentUser.name
    document.getElementById("userNameGreeting").textContent = currentUser.name

    if (currentUser.role === "admin") {
      document.getElementById("adminPanel").style.display = "block"
      document.getElementById("userRoleBadge").style.display = "inline-block"
    }

    updateStats()
    renderParcels()
    renderActivity()

    // Setup barrios dropdown
    const destinationSelect = document.getElementById("destination")
    if (destinationSelect) {
      destinationSelect.addEventListener("change", () => {
        updateBarriosSelect("destination", "destinationBarrio")
      })
    }
  }

  // Formulario de login
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const errorDiv = document.getElementById("errorMessage")

      if (login(email, password)) {
        window.location.href = "dashboard.html"
      } else {
        errorDiv.textContent = "Credenciales incorrectas. Intenta de nuevo."
        errorDiv.classList.remove("d-none")
      }
    })
  }

  // Formulario de registro
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value
      const errorDiv = document.getElementById("errorMessage")
      const successDiv = document.getElementById("successMessage")

      errorDiv.classList.add("d-none")
      successDiv.classList.add("d-none")

      if (password !== confirmPassword) {
        errorDiv.textContent = "Las contrasenas no coinciden"
        errorDiv.classList.remove("d-none")
        return
      }

      if (password.length < 6) {
        errorDiv.textContent = "La contrasena debe tener al menos 6 caracteres"
        errorDiv.classList.remove("d-none")
        return
      }

      if (register(name, email, password)) {
        successDiv.textContent = "Cuenta creada exitosamente. Redirigiendo..."
        successDiv.classList.remove("d-none")
        setTimeout(() => {
          window.location.href = "login.html"
        }, 1500)
      } else {
        errorDiv.textContent = "El email ya esta registrado"
        errorDiv.classList.remove("d-none")
      }
    })
  }

  // Formulario de nueva encomienda
  const parcelForm = document.getElementById("parcelForm")
  if (parcelForm) {
    const originSelect = document.getElementById("origin")
    const destinationSelect = document.getElementById("destination")

    const updatePreview = () => {
      const origin = originSelect.value
      const destination = destinationSelect.value
      const previewDiv = document.getElementById("estimatedTimePreview")

      if (origin && destination && origin !== destination) {
        const distance = getDistance(origin, destination)
        const time = calculateEstimatedTime(distance)

        document.getElementById("previewTime").textContent = time
        document.getElementById("previewDistance").textContent = distance
        previewDiv.style.display = "block"

        // Inicializar mapa de preview
        setTimeout(() => {
          initPreviewMap(origin, destination)
        }, 100)
      } else {
        previewDiv.style.display = "none"
      }
    }

    originSelect.addEventListener("change", updatePreview)
    destinationSelect.addEventListener("change", () => {
      updatePreview()
      updateBarriosSelect("destination", "destinationBarrio")
    })

    parcelForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const data = {
        description: document.getElementById("description").value,
        sender: document.getElementById("sender").value,
        recipient: document.getElementById("recipient").value,
        origin: document.getElementById("origin").value,
        destination: document.getElementById("destination").value,
        destinationBarrio: document.getElementById("destinationBarrio").value,
        address: document.getElementById("address").value,
        weight: document.getElementById("weight").value,
      }

      const newParcel = createParcel(data)

      if (newParcel) {
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("newParcelModal"))
        modal.hide()

        // Limpiar formulario
        parcelForm.reset()
        document.getElementById("estimatedTimePreview").style.display = "none"

        // Actualizar UI
        updateStats()
        renderParcels()
        renderActivity()

        // Mostrar mensaje de exito
        alert(
          `Encomienda creada exitosamente!\n\nCodigo de seguimiento: ${newParcel.trackingCode}\nTiempo estimado: ${newParcel.estimatedTime}\nDestino: ${newParcel.destination}, ${newParcel.destinationBarrio}`
        )
      }
    })
  }

  // Formulario de editar estado (admin)
  const editStatusForm = document.getElementById("editStatusForm")
  if (editStatusForm) {
    editStatusForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const parcelId = Number.parseInt(document.getElementById("editParcelId").value)
      const newStatus = document.getElementById("editStatus").value

      if (updateParcelStatus(parcelId, newStatus)) {
        const modal = bootstrap.Modal.getInstance(document.getElementById("editStatusModal"))
        modal.hide()

        updateStats()
        renderParcels()
        renderActivity()
        renderAdminParcelsTable()

        alert("Estado actualizado exitosamente")
      }
    })
  }

  // Rastreo rapido
  const quickTrackForm = document.getElementById("quickTrackForm")
  if (quickTrackForm) {
    quickTrackForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const code = document.getElementById("quickTrackCode").value.trim().toUpperCase()
      const resultDiv = document.getElementById("quickTrackResult")

      const parcel = parcels.find((p) => p.trackingCode === code)

      if (parcel) {
        const statusInfo = getStatusInfo(parcel.status)
        resultDiv.innerHTML = `
          <div class="card border-0 bg-light">
            <div class="card-body p-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="parcel-id">${parcel.trackingCode}</span>
                <span class="status-badge status-${parcel.status.toLowerCase().replace(" ", "")}">
                  ${parcel.status}
                </span>
              </div>
              <small class="text-muted d-block">${parcel.origin} → ${parcel.destination}</small>
              <small class="text-muted d-block">${parcel.destinationBarrio || ""}</small>
              <small class="text-success d-block mt-1">
