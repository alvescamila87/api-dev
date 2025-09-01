import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export function Home() {
  const noticias = [
    {
      id: 1,
      titulo: "Nova funcionalidade implementada!",
      descricao: "O módulo de produtos agora possui filtros avançados.",
      imagem: "https://source.unsplash.com/random/400x200?technology",
    },
    {
      id: 2,
      titulo: "Manutenção agendada",
      descricao: "O sistema ficará fora do ar no sábado das 02h às 04h.",
      imagem: "https://source.unsplash.com/random/400x200?maintenance",
    },
    {
      id: 3,
      titulo: "Atualização de segurança",
      descricao: "Foi aplicada uma atualização crítica de segurança.",
      imagem: "https://source.unsplash.com/random/400x200?security",
    },
  ];

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Últimas notícias
        </Typography>
        <Grid container spacing={4}>
          {noticias.map((noticia) => (
            <Grid key={noticia.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={noticia.imagem}
                  alt={noticia.titulo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {noticia.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {noticia.descricao}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
