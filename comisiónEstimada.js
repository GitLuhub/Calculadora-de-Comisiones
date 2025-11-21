// 1. Obtener el registro del Trato
trato = zoho.crm.getRecordById("Deals", id_trato);

// 2. Validar que exista y tenga importe
if(trato.get("id") != null && trato.get("Amount") != null)
{
	importe = trato.get("Amount").toDecimal();
	porcentaje = 0.0;
	
	// 3. Lógica de Tramos (Reglas de Negocio)
	// Tramo A: Menos de 5,000 -> 5%
	if (importe < 5000) 
	{
		porcentaje = 0.05;
	}
	// Tramo B: Entre 5,000 y 10,000 -> 8%
	else if (importe >= 5000 && importe < 10000)
	{
		porcentaje = 0.08;
	}
	// Tramo C: Más de 10,000 -> 12%
	else 
	{
		porcentaje = 0.12;
	}
	
	// 4. Cálculo
	comision_valor = (importe * porcentaje).round(2);
	
	// 5. Actualizar el campo en el CRM
	mapa_actualizar = Map();
	mapa_actualizar.put("Comisi_n_Estimada", comision_valor); // Ojo con el nombre API de tu campo
	
	resp = zoho.crm.updateRecord("Deals", id_trato, mapa_actualizar);
	
	info "Comisión calculada: " + comision_valor;
}
else
{
	info "El trato no tiene importe o no existe.";
}
