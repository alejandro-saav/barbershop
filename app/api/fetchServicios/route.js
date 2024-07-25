import { fetchServiciosYBarberos } from "@/app/lib/data";

export async function GET(res) {
  try {
    const { servicios, barberos } = await fetchServiciosYBarberos();
    return new Response(
      JSON.stringify({
        servicios: servicios,
        barberos: barberos,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // res.status(200).json.st({ servicios, barberos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email." });
  }
}
