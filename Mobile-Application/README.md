<div align="center">
  <img src="./assets/logo.png" alt="JobFit-Score Logo" width="200"/>
  
  # JobFit-Score
  
  [![React Native](https://img.shields.io/badge/React%20Native-v0.76-61DAFB?logo=react)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-SDK%2053-000020?logo=expo)](https://expo.dev/)
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql)](https://www.postgresql.org/)
  [![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python)](https://www.python.org/)
</div>


### 🎥 Demonstração
[![Ver demonstração no YouTube](https://img.shields.io/badge/YouTube-Ver%20Demonstração-red?style=for-the-badge&logo=youtube)](https://youtu.be/ERWwGtQpkZk)

---

## 📖 Sobre o Projeto

O **JobFit-Score** é uma solução inovadora desenvolvida para a Global Solution da FIAP que revoluciona o processo de recrutamento e seleção. Utilizando Inteligência Artificial, o aplicativo calcula a compatibilidade entre candidatos e vagas, otimizando o match perfeito entre talentos e oportunidades.

### 🎯 Objetivo

Facilitar a conexão entre candidatos qualificados e empresas que buscam os melhores profissionais, reduzindo o tempo de contratação e aumentando a assertividade nas escolhas.

---

## 🛠️ Stack Tecnológica

### Frontend Mobile
- **React Native** com Expo SDK 53
- **TypeScript** para tipagem estática
- **React Navigation** para roteamento

### Backend
- **Java 21+** com Spring Boot
- **PostgreSQL 16+** como banco de dados
- **Flyway** para migrations
- **Spring Data JPA** para persistência

### Inteligência Artificial
- **Python 3.10+**
- **Ollama** com modelo Llama 3.2:3b
- API REST para integração

---

## 🚀 Instalação

### 📋 Pré-requisitos

Certifique-se de ter instalado:

- ☕ Java 21 ou superior
- 🐘 PostgreSQL 16 ou superior
- 📦 Node.js 18 ou superior
- 🐍 Python 3.10 ou superior
- 🦙 Ollama

---

## 🗄️ Parte 1: Configuração do Banco de Dados

### Instalação do PostgreSQL

<details>
<summary><b>🐧 Linux</b></summary>

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```
</details>

<details>
<summary><b>🪟 Windows</b></summary>

1. Baixe o instalador oficial: [postgresql.org/download](https://www.postgresql.org/download/)
2. Execute o instalador e siga as instruções
3. Defina uma senha forte para o usuário `postgres`
4. Mantenha a porta padrão `5432`
5. Finalize a instalação
</details>

<details>
<summary><b>🐳 Docker (Recomendado)</b></summary>

```bash
docker run --name jobfitscore-postgres \
  -e POSTGRES_PASSWORD=sua_senha \
  -e POSTGRES_DB=jobfitscore \
  -p 5432:5432 \
  -d postgres:16
```
</details>

### Criação do Banco de Dados

Acesse o PostgreSQL:

```bash
# Linux/Mac
sudo -u postgres psql

# Windows
psql -U postgres

# Docker
docker exec -it jobfitscore-postgres psql -U postgres
```

Execute os comandos SQL:

```sql
-- Criar o banco de dados
CREATE DATABASE jobfitscore;

-- Verificar criação
\l
```

---

## ⚙️ Parte 2: Configuração da API Backend

### 1. Clone o Repositório

```bash
git clone -b mobile https://github.com/thejaobiell/GS-JOBFIT-SCORE-Java.git
cd GS-JOBFIT-SCORE-Java
```

### 2. Configure seu usuário

Edite o arquivo `src/main/resources/application.properties`:

```properties
spring.application.name=jobfitscore

spring.datasource.url=jdbc:postgresql://localhost:5432/jobfitscore
spring.datasource.username=<seu usuario>
spring.datasource.password=<sua senha>

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.repair=true
spring.flyway.repair-on-migrate=true

spring.main.allow-bean-definition-overriding=true

server.address=0.0.0.0
server.port=8080
```

### 3. Execute a API

**Linux/macOS/WSL:**
```bash
./mvnw spring-boot:run
```

**Windows:**
```powershell
.\mvnw.cmd spring-boot:run
```

### 4. Verifique a API

Acesse no navegador: `http://localhost:8080`

Você deve ver uma página HTML informando que a API está funcionando.

---

## 🤖 Parte 3: Configuração da API de IA

### 1. Clone o Repositório

```bash
git clone https://github.com/thejaobiell/GS-JOBFIT-SCORE-IA_IOT.git
cd GS-JOBFIT-SCORE-IA_IOT
```

### 2. Instale o Ollama

Visite [ollama.com](https://ollama.com/) e siga as instruções de instalação para seu sistema operacional.

### 3. Baixe o Modelo de IA

```bash
ollama pull llama3.2:3b
```

### 4. Execute a API de IA

```bash
# Torne o script executável
chmod +x run_api.sh

# Execute a API
./run_api.sh --host 0.0.0.0 --port 9001 --model llama3.2:3b
```

A API estará disponível em `http://localhost:9001`

---

## 📱 Parte 4: Configuração do App Mobile

### 1. Clone o Repositório

```bash
git clone https://github.com/FIAP-MOBILE/global-solution-jobfit-score.git
cd global-solution-jobfit-score
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

#### Descubra seu IP Local

**Linux/Mac:**
```bash
hostname -I | awk '{print $1}'
```

**Windows:**
```powershell
ipconfig
```
> Procure por **Endereço IPv4** (ex: 192.168.1.100)

#### Crie o arquivo `.env`

Na raiz do projeto, crie o arquivo `.env`:

```env
EXPO_PUBLIC_IP=SEU_IP_AQUI
```

**Exemplo:**
```env
EXPO_PUBLIC_IP=192.168.1.100
```

### 4. Execute o Aplicativo

```bash
npm start
```

> ⚠️ **Importante**: Seu dispositivo deve estar na mesma rede Wi-Fi que seu computador.

---

## 🔍 Verificação e Troubleshooting

### ✅ Checklist de Verificação

- [ ] PostgreSQL rodando na porta 5432
- [ ] Banco `jobfitscore` criado
- [ ] API Backend Java rodando em `http://localhost:8080`
- [ ] Ollama instalado e modelo baixado
- [ ] API de IA rodando em `http://localhost:9001`
- [ ] Arquivo `.env` configurado corretamente
- [ ] Dispositivo na mesma rede Wi-Fi

### 🐛 Problemas Comuns

<details>
<summary><b>Erro de conexão com o banco de dados</b></summary>

- Verifique se o PostgreSQL está rodando
- Confirme usuário e senha no `application.properties`
- Teste a conexão: `psql -U postgres -d jobfitscore`
</details>

<details>
<summary><b>API não responde no dispositivo</b></summary>

- Confirme que está na mesma rede Wi-Fi
- Verifique o IP no arquivo `.env`
- Desabilite firewall temporariamente para testar
</details>

<details>
<summary><b>Erro ao baixar modelo do Ollama</b></summary>

- Verifique conexão com internet
- Execute: `ollama list` para ver modelos instalados
- Tente: `ollama pull llama3.2:3b` novamente
</details>

---

## 👥 Equipe de Desenvolvimento

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/thejaobiell">
          <img src="https://github.com/thejaobiell.png" width="120px;" alt="João Gabriel Boaventura"/><br>
          <sub><b>João Gabriel Boaventura</b></sub><br>
          <sub>RM554874 • 2TDSB</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/leomotalima">
          <img src="https://github.com/leomotalima.png" width="120px;" alt="Léo Mota Lima"/><br>
          <sub><b>Léo Mota Lima</b></sub><br>
          <sub>RM557851 • 2TDSB</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/LucasLDC">
          <img src="https://github.com/LucasLDC.png" width="120px;" alt="Lucas Leal das Chagas"/><br>
          <sub><b>Lucas Leal das Chagas</b></sub><br>
          <sub>RM551124 • 2TDSB</sub>
        </a>
      </td>
    </tr>
  </table>
</div>
