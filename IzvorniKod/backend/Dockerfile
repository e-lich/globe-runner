FROM python:3.10.8

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_ENV production

EXPOSE 4000

CMD ["gunicorn", "-b", "0.0.0.0:4000", "__init__:app"]