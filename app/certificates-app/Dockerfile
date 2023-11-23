# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos restantes do projeto para o diretório de trabalho
COPY . .

# Exponha a porta em que seu servidor estará escutando
EXPOSE 3001

# Comando para iniciar o aplicativo
CMD ["npm", "run", "dev"]