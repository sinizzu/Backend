FROM node:16

RUN apt-get update && apt-get -y upgrade && apt-get -y install git net-tools vim netcat

RUN mkdir -p /root/Backend
WORKDIR /root/Backend

COPY package*.json ./

# 의존성을 설치
RUN npm install && npm install -g nodemon

COPY . .

# 애플리케이션 포트 설정
EXPOSE 8000

# 애플리케이션을 실행
CMD ["nodemon", "src/app.js"]
