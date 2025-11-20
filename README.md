# Análisis del Script: Calculadora de Comisión Estimada

Este documento detalla la funcionalidad del script `comisiónEstimada`, diseñado para ejecutarse en Zoho CRM (Deluge Script).

## 1. Propósito General
El objetivo del script es calcular automáticamente la comisión de un vendedor al cerrar un trato, basándose en el importe del mismo y aplicando reglas de negocio predefinidas (tramos). El resultado se guarda en el campo `Comisi_n_Estimada` del módulo de Tratos (Deals).

## 2. Flujo de Ejecución

### Paso 1: Obtención del Registro
- **Entrada:** Recibe `id_trato` como parámetro (ID del registro en el módulo Deals).
- **Acción:** Utiliza `zoho.crm.getRecordById` para recuperar los datos del trato.

### Paso 2: Validación
- Verifica dos condiciones críticas antes de proceder:
    1.  Que el trato exista (`id` no es nulo).
    2.  Que el trato tenga un valor en el campo `Amount` (Importe).
- **Manejo de Error:** Si no se cumplen, registra un mensaje: "El trato no tiene importe o no existe."

### Paso 3: Lógica de Negocio (Tramos de Comisión)
El script evalúa el `Amount` (Importe) del trato para asignar un porcentaje de comisión:

| Rango de Importe | Porcentaje Aplicado |
| :--- | :--- |
| Menor a 5,000 | **5%** (0.05) |
| Entre 5,000 y 9,999 | **8%** (0.08) |
| 10,000 o más | **12%** (0.12) |

### Paso 4: Cálculo Matemático
- Calcula el valor monetario de la comisión: `Importe * Porcentaje`.
- Redondea el resultado a 2 decimales para asegurar precisión financiera.

### Paso 5: Actualización en CRM
- Crea un mapa de actualización (`mapa_actualizar`).
- Inserta el valor calculado en el campo con nombre API `Comisi_n_Estimada`.
- Ejecuta `zoho.crm.updateRecord` para guardar el dato en el registro del trato.

## 3. Datos Técnicos
- **Lenguaje:** Deluge (Zoho proprietary).
- **Módulo Afectado:** Deals (Tratos).
- **Campos Clave:**
    - `Amount`: Usado para el cálculo base.
    - `Comisi_n_Estimada`: Campo destino del resultado.

## 4. Consideraciones
- **Nombre API:** Es crucial verificar que el nombre API del campo destino sea exactamente `Comisi_n_Estimada` en la configuración del CRM, de lo contrario el script fallará al guardar.
- **Trigger:** Este script está diseñado para ser invocado por una regla de flujo de trabajo (Workflow Rule), idealmente cuando el estado del trato cambia a "Cerrado Ganado" (Closed Won).
