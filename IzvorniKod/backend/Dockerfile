FROM python:3.10.8

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

RUN mkdir backend

COPY . ./backend

RUN cd backend

ENV FLASK_ENV production

EXPOSE 5000