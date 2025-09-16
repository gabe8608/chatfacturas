const { DefaultAzureCredential } = require("@azure/identity");
const { CostManagementClient } = require("@azure/arm-costmanagement");

module.exports = async function (context, req) {
    try {
        // Autenticación con Managed Identity
        const credential = new DefaultAzureCredential();
        const client = new CostManagementClient(credential);

        // Consulta básica de costos (últimos 7 días, por suscripción)
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);

        const scope = `/subscriptions/${process.env.AZURE_SUBSCRIPTION_ID}`;
        const result = await client.query.usage(scope, {
            type: "Usage",
            timeframe: "Custom",
            timePeriod: {
                from: lastWeek,
                to: today
            },
            dataset: {
                granularity: "Daily",
                aggregation: {
                    totalCost: {
                        name: "PreTaxCost",
                        function: "Sum"
                    }
                }
            }
        });

        context.res = {
            status: 200,
            body: {
                mensaje: "Consulta de facturación realizada con éxito",
                periodo: `${lastWeek.toISOString().slice(0, 10)} - ${today.toISOString().slice(0, 10)}`,
                resultado: result
            }
        };

    } catch (error) {
        context.log("Error en la función:", error.message);
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};
