const express = require("express");
const app = express();
const Convidado = require("./models/Convidado");
const Organizador = require("./models/Organizador");
const PORT = process.env.PORT || 3000;
app.use(express.json());

//lembrar colocar o bcrypt
app.post("/cadastro/organizador", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoOrganizador = await Organizador.create({ nome, email, senha });
    res.status(201).json(novoOrganizador);
  } catch (error) {
    console.error("Erro ao criar organizador", error);
    res.status(500).send("Erro ao criar organizador");
  }
});
app.post("/login/organizador", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const organizador = await Organizador.findOne({ where: { email } });
    if (!organizador.email) {
      return res.status(401).json({ erro: "email inválido" });
    } else if (organizador.senha !== senha) {
      return res.status(401).json({ erro: "Senha inválida" });
    }
    res
      .status(201)
      .json({ mensagem: "Login organizador bem-sucedido", organizador });
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
      return res.status(401).json({ erro: "email inválido" });
    } else if (convidado.senha !== senha) {
      return res.status(401).json({ erro: "Senha inválida" });
    }
    res
      .status(201)
      .json({ mensagem: "Login convidado bem-sucedido", convidado });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao fazer login de convidado", error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando porta: ${PORT}`);
});
