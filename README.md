ESTRUCTURA DEL PROYECTO 
Azure Function con HTTP Trigger.
Autenticación segura usando Azure Identity (sin secretos en código).
Consulta de costos a través de Azure Cost Management SDK.
Preparado para integrarse con aplicaciones de chat o asistentes virtuales.

/azure-facturacion-chat
  ├── function-billing/
  │     ├── index.js          # Lógica principal de la Function
  │     ├── function.json     # Configuración del trigger
  │     └── package.json      # Dependencias (Node.js)
  ├── infra/                  # Scripts opcionales (Bicep/Terraform/ARM)
  └── README.md               # Documentación del proyecto

REQUISITOS PREVIOS

Azure Subscription con permisos para consultar costos.
Azure Functions Core Tools instalado en tu PC.
Node.js v16+ (o Python, según la implementación).
Una cuenta de Azure Storage (requerida por Functions).

INSTALACION LOCAL

# Clonar el repositorio

git clone https://github.com/tuusuario/azure-facturacion-chat.git
cd azure-facturacion-chat/function-billing

# Instalar dependencias

npm install

EJECUTAR LOCALMENTE

func start

SI TODO SALIÓ BIEN PRUEBA ESTE LOCAL

http://localhost:7071/api/facturacion

DESPLIEGUE EN AZURE

Crear una Function App en el portal de Azure o con Azure CLI.
Configurar Application Settings (ejemplo: credenciales de Managed Identity).
Publicar con Azure Functions Core Tools:

EN POWER SHELL

func azure functionapp publish <NOMBRE-DE-TU-FUNCTION-APP>


A NIVEL DE SEGURIDAD

EN POWER SHELL

curl -X GET "http://localhost:7071/api/facturacion"


ARCHIVO JSON 

{
  "mensaje": "Consulta de facturación realizada con éxito",
  "costo": "120.50 USD",
  "periodo": "2025-09"
}







