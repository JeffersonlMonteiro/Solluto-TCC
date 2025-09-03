FROM node:20

# define diretório de trabalho
WORKDIR /app

# instala dependências primeiro (cache melhor)
COPY package*.json ./
RUN npm install

# copia código
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]
