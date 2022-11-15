FROM python:3.10.8

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_ENV production

EXPOSE 4000

RUN python -m debugpy --wait-for-client --listen 0.0.0.0:5678 -m flask run --host=0.0.0.0

CMD ["gunicorn", "-b", "0.0.0.0:4000", "__init__:app"]