export async function GET() {
  await new Promise((res) => setTimeout(res, 700));

  return Response.json({
    orders: [
      { id: "#1048", customer: "David Figar", status: "Zaplaceno", amount: "8 490 Kč" },
      { id: "#1047", customer: "MK Studio", status: "Čeká", amount: "3 290 Kč" },
      { id: "#1046", customer: "Auto Care Zlín", status: "Zaplaceno", amount: "12 900 Kč" },
      { id: "#1045", customer: "Jan K.", status: "Storno", amount: "1 490 Kč" },
    ],
  });
}