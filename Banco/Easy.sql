CREATE DATABASE Easy;
USE Easy;
go

-- Tabela Organizador
CREATE TABLE Organizador (
    organizadorId INT PRIMARY KEY NOT NULL,
    nome VARCHAR(100),
    fone VARCHAR(20),
    email VARCHAR(100),
    endereco VARCHAR(200)
);

-- Tabela Convidado
CREATE TABLE Convidado (
    convidadoId INT PRIMARY KEY,
    nomeConvidado VARCHAR(100),
    foneConvidado VARCHAR(20),
    emailConvidado VARCHAR(100),
    enderecoConvidado VARCHAR(200),
    avaliacaoConvidado TEXT
);

-- Tabela Evento
CREATE TABLE Evento (
    eventoId INT PRIMARY KEY,
    organizadorId INT,
    nome VARCHAR(100),
    data DATE,
    valor DECIMAL(10, 2),
    descricaoEvento TEXT,
    avaliacaoEvento TEXT,
    valorPatrocinio DECIMAL(10),
    prioridadeEvento INT DEFAULT 0,
    emAlta BIT DEFAULT 0,
    FOREIGN KEY (organizadorId) REFERENCES Organizador(organizadorId)
);

-- Tabela Pagamento
CREATE TABLE Pagamento (
    pagamanetoId INT PRIMARY KEY,
    convidadoId INT,
    eventoId INT,
    metodoPagamento VARCHAR(50),
    valorPagamento DECIMAL(10, 2),
    relatorioPagamento TEXT,
    FOREIGN KEY (convidadoId) REFERENCES Convidado(convidadoId),
    FOREIGN KEY (eventoId) REFERENCES Evento(eventoId)
);

-- Tabela Midia
CREATE TABLE Midia (
    midiaId INT PRIMARY KEY,
    eventoId INT,
    tipo TEXT,
    urlMidia TEXT,
    FOREIGN KEY (eventoId) REFERENCES Evento(eventoId)
);