import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { DashboardLayout } from "@/components";
import ClientTable from "./_components/client-table";
import { clientService } from "@/services";

export default async function ClientesPage() {
  const clients = await clientService.getAll();
  return (
    <DashboardLayout>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon />}
          sx={{ pl: 0 }}
        >
          <Link color="neutral" href="#some-link" aria-label="Home">
            <HomeRoundedIcon />
          </Link>
          <Link
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Dashboard
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Clientes
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Clientes
        </Typography>
        <Link href={"./clientes/agregar"}>
          <Button variant="soft">Agregar cliente</Button>
        </Link>
      </Box>
      <ClientTable clients={clients} />
    </DashboardLayout>
  );
}
