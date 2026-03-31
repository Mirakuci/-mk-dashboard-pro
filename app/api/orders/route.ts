export async function GET() {
  await new Promise((res) => setTimeout(res, 700));

  return Response.json({
    orders: [
      { id: "#1048", customer: "Nordic Solutions", status: "Zaplaceno", amount: "8 490 Kč" },
      { id: "#1047", customer: "BluePeak Agency", status: "Čeká", amount: "3 290 Kč" },
      { id: "#1046", customer: "Vertex Labs", status: "Zaplaceno", amount: "12 900 Kč" },
      { id: "#1045", customer: "CoreData Systems", status: "Storno", amount: "1 490 Kč" },
      { id: "#1044", customer: "NovaTech Group", status: "Zaplaceno", amount: "6 900 Kč" },
      { id: "#1043", customer: "Orbit Solutions", status: "Čeká", amount: "2 490 Kč" },
    ],
  });
}