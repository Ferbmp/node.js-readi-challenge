# Use a versão 18 do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que o servidor utiliza
EXPOSE 3000

# Comando para executar o servidor
CMD ["npm", "start"]
