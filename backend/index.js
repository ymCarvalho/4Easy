const express = require("express");
const app = express();
const Convidado = require("./models/Convidado");
const Organizador = require("./models/Organizador");
const Evento = require("./models/Evento");
const Localizacao = require("./models/Localizacao");

const PORT = process.env.PORT || 3000;
app.use(express.json());

//lembrar colocar o bcrypt
app.post("/cadastro/organizador", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoOrganizador = await Organizador.create({ nome, email, senha });
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      organizador: novoOrganizador,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }

    console.error("Erro ao criar organizador", error);
    res.status(500).send("Erro ao criar organizador");
  }
});
app.post("/login/organizador", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const organizador = await Organizador.findOne({ where: { email } });
    if (!organizador) {
      return res.status(401).json({ message: "Email inválido" });
    } else if (organizador.senha !== senha) {
      return res.status(401).json({ erro: "Senha inválida" });
    }
    res
      .status(201)
      .json({ message: "Login organizador bem-sucedido", organizador });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao fazer login de organizador", error });
  }
});

app.post("/cadastro/convidado", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoConvidado = await Convidado.create({ nome, email, senha });
    res.status(201).json(novoConvidado);
  } catch (error) {
    console.error("Erro ao criar convidado", error);
    res.status(500).send("Erro ao criar convidado");
  }
});

app.post("/login/convidado", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const convidado = await Convidado.findOne({ where: { email } });
    if (!convidado.email) {
      return res.status(401).json({ message: "Email inválido" });
    } else if (convidado.senha !== senha) {
      return res.status(401).json({ erro: "Senha inválida" });
    }
    res
      .status(201)
      .json({ message: "Login convidado bem-sucedido", convidado });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao fazer login de convidado", error });
  }
});

app.post("/eventos", async (req, res) => {
  try {
    const novoEvento = await Evento.create(req.body);
    res.status(201).json(novoEvento);
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).json({ erro: "Erro ao criar evento" });
  }
});

app.get("/eventos", async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      include: {
        model: Localizacao,
        attributes: [
          "id",
          "nomeLocal",
          "rua",
          "numero",
          "complemento",
          "cep",
          "bairro",
          "cidade",
          "estado",
        ],
      },
    });
    res.status(200).json(eventos);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
});

app.post("/localizacao", async (req, res) => {
  try {
    const novaLoc = await Localizacao.create(req.body);
    res.status(201).json(novaLoc);
  } catch (error) {
    console.error("Erro ao criar localização:", error);
    res.status(500).send("Erro ao criar localização");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando porta: ${PORT}`);
});
