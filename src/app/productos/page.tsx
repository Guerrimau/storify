import { Box, Breadcrumbs, Button, Link, Stack, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { DashboardLayout } from "@/components";
import ProductTable from "./_components/product-table";
import { productService } from "@/services";

export default async function ProductsPage() {
  const products = await productService.getAll();
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
            Productos
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
          Productos
        </Typography>
        <Link href={"./productos/agregar"}>
          <Button variant="soft">Agregar producto</Button>
        </Link>
      </Box>
      <ProductTable products={products} />
    </DashboardLayout>
  );
}
