// ============================================
// TECHLOG - Sistema de Gestion de Encomiendas
// ============================================

// Base de datos simulada con distancias entre ciudades (en km)
const cityDistances = {
  "Lima-Arequipa": 1020,
  "Lima-Trujillo": 560,
  "Lima-Chiclayo": 770,
  "Lima-Cusco": 1105,
  "Lima-Piura": 980,
  "Lima-Iquitos": 1010,
  "Lima-Huancayo": 300,
  "Lima-Tacna": 1290,
  "Lima-Puno": 1310,
  "Arequipa-Cusco": 485,
  "Arequipa-Tacna": 370,
  "Arequipa-Puno": 280,
  "Trujillo-Chiclayo": 210,
  "Trujillo-Piura": 410,
  "Cusco-Puno": 390,
  "Chiclayo-Piura": 220,
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

// Datos iniciales
let users = [
  { id: 1, name: "Administrador", email: "admin@techlog.com", password: "admin123", role: "admin" },
  { id: 2, name: "Usuario Demo", email: "user@demo.com", password: "demo123", role: "user" },
]

let parcels = [
  {
    id: 1,
    trackingCode: "TL-2024-0001",
    description: "Documentos importantes",
    sender: "Empresa ABC",
    recipient: "Juan Perez",
    origin: "Lima",
    destination: "Arequipa",
    address: "Av. Principal 123",
    weight: 2.5,
    status: "En Transito",
    userId: 2,
    estimatedTime: "17h 00min",
    distance: 1020,
    progress: 50,
    createdAt: "2024-01-15",
    timeline: [
      { status: "Procesando", date: "2024-01-15 09:00", location: "Lima - Centro de Operaciones" },
      { status: "Recolectado", date: "2024-01-15 11:00", location: "Lima - Almacen Central" },
      { status: "En Transito", date: "2024-01-15 14:00", location: "En camino a Arequipa" },
    ],
  },
  {
    id: 2,
    trackingCode: "TL-2024-0002",
    description: "Equipo electronico",
    sender: "Tech Store",
    recipient: "Maria Garcia",
    origin: "Trujillo",
    destination: "Chiclayo",
    address: "Calle Secundaria 456",
    weight: 1.2,
    status: "Entregado",
    userId: 2,
    estimatedTime: "3h 30min",
    distance: 210,
    progress: 100,
    createdAt: "2024-01-14",
    timeline: [
      { status: "Procesando", date: "2024-01-14 08:00", location: "Trujillo - Centro de Operaciones" },
      { status: "Recolectado", date: "2024-01-14 10:00", location: "Trujillo - Almacen" },
      { status: "En Transito", date: "2024-01-14 12:00", location: "En camino a Chiclayo" },
      { status: "En Reparto", date: "2024-01-14 14:30", location: "Chiclayo - Centro de Distribucion" },
      { status: "Entregado", date: "2024-01-14 16:00", location: "Entregado en direccion" },
    ],
  },
]

let currentUser = null
let currentFilter = "all"

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
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
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

  const newParcel = {
    id: parcels.length + 1,
    trackingCode,
    description: data.description,
    sender: data.sender,
    recipient: data.recipient,
    origin: data.origin,
    destination: data.destination,
    address: data.address,
    weight: Number.parseFloat(data.weight),
    status: "Procesando",
    userId: currentUser.id,
    estimatedTime,
    distance,
    progress: 10,
    createdAt: new Date().toISOString().split("T")[0],
    timeline: [
      {
        status: "Procesando",
        date: new Date().toLocaleString("es-ES"),
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
    parcel.timeline.push({
      status: newStatus,
      date: new Date().toLocaleString("es-ES"),
      location: `${newStatus === "Entregado" ? parcel.destination : parcel.origin} - Actualizado`,
    })
    localStorage.setItem("parcels", JSON.stringify(parcels))
    return true
  }
  return false
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
                        <i class="bi bi-person"></i>
                        <span>${parcel.recipient}</span>
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
            <div class="col-md-6">
                <div class="d-flex align-items-center mb-4">
                    <span class="parcel-id me-3">${parcel.trackingCode}</span>
                    <span class="status-badge status-${parcel.status.toLowerCase().replace(" ", "")}">
                        <i class="bi ${statusInfo.icon}"></i> ${parcel.status}
                    </span>
                </div>
                
                <h5 class="fw-bold mb-3">${parcel.description}</h5>
                
                <div class="mb-3">
                    <small class="text-muted d-block">Remitente</small>
                    <strong>${parcel.sender}</strong>
                </div>
                <div class="mb-3">
                    <small class="text-muted d-block">Destinatario</small>
                    <strong>${parcel.recipient}</strong>
                </div>
                <div class="mb-3">
                    <small class="text-muted d-block">Direccion de Entrega</small>
                    <strong>${parcel.address}</strong>
                </div>
                <div class="row">
                    <div class="col-6">
                        <small class="text-muted d-block">Peso</small>
                        <strong>${parcel.weight} kg</strong>
                    </div>
                    <div class="col-6">
                        <small class="text-muted d-block">Distancia</small>
                        <strong>${parcel.distance} km</strong>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="estimated-time-card mb-4">
                    <small class="text-muted">Tiempo Estimado de Entrega</small>
                    <div class="time-display">${parcel.estimatedTime}</div>
                    <div class="time-label">${parcel.origin} → ${parcel.destination}</div>
                </div>
                
                <!-- Visualizacion del recorrido -->
                <div class="map-container mb-4">
                    <div class="route-visualization">
                        <div class="route-path">
                            <div class="route-progress" style="width: ${parcel.progress}%;"></div>
                        </div>
                        <div class="route-point origin">
                            <i class="bi bi-geo-alt-fill"></i>
                        </div>
                        ${
                          parcel.progress > 10 && parcel.progress < 100
                            ? `
                            <div class="route-point current" style="left: ${parcel.progress}%;">
                                <i class="bi bi-truck"></i>
                            </div>
                        `
                            : ""
                        }
                        <div class="route-point destination">
                            <i class="bi bi-flag-fill"></i>
                        </div>
                    </div>
                </div>
                
                <div class="row text-center">
                    <div class="col-6">
                        <small class="text-muted d-block">Origen</small>
                        <strong>${parcel.origin}</strong>
                    </div>
                    <div class="col-6">
                        <small class="text-muted d-block">Destino</small>
                        <strong>${parcel.destination}</strong>
                    </div>
                </div>
            </div>
        </div>
        
        <hr class="my-4">
        
        <h6 class="fw-bold mb-3"><i class="bi bi-clock-history me-2"></i>Historial de Seguimiento</h6>
        <div class="tracking-timeline">
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
    `

  const modal = window.bootstrap.Modal(document.getElementById("parcelDetailModal"))
  modal.show()
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
                <td>${user ? user.name : "Desconocido"}</td>
                <td>${parcel.origin}</td>
                <td>${parcel.destination}</td>
                <td>
                    <span class="status-badge status-${parcel.status.toLowerCase().replace(" ", "")}">
                        <i class="bi ${statusInfo.icon}"></i> ${parcel.status}
                    </span>
                </td>
                <td>${parcel.estimatedTime}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="showParcelDetail(${parcel.id})">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="openEditStatusModal(${parcel.id})">
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

  const modal = window.bootstrap.Modal(document.getElementById("editStatusModal"))
  modal.show()
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
    // Preview de tiempo estimado al cambiar origen/destino
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
      } else {
        previewDiv.style.display = "none"
      }
    }

    originSelect.addEventListener("change", updatePreview)
    destinationSelect.addEventListener("change", updatePreview)

    parcelForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const data = {
        description: document.getElementById("description").value,
        sender: document.getElementById("sender").value,
        recipient: document.getElementById("recipient").value,
        origin: document.getElementById("origin").value,
        destination: document.getElementById("destination").value,
        address: document.getElementById("address").value,
        weight: document.getElementById("weight").value,
      }

      const newParcel = createParcel(data)

      if (newParcel) {
        // Cerrar modal
        const modal = window.bootstrap.Modal.getInstance(document.getElementById("newParcelModal"))
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
          `Encomienda creada exitosamente!\n\nCodigo de seguimiento: ${newParcel.trackingCode}\nTiempo estimado: ${newParcel.estimatedTime}`,
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
        const modal = window.bootstrap.Modal.getInstance(document.getElementById("editStatusModal"))
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
                            <small class="text-success d-block mt-1">
                                <i class="bi bi-clock me-1"></i>${parcel.estimatedTime}
                            </small>
                            <button class="btn btn-sm btn-primary mt-2 w-100" onclick="showParcelDetail(${parcel.id})">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                `
      } else {
        resultDiv.innerHTML = `
                    <div class="alert alert-warning mb-0 py-2">
                        <small><i class="bi bi-exclamation-triangle me-1"></i>No encontrada</small>
                    </div>
                `
      }
    })
  }
})
