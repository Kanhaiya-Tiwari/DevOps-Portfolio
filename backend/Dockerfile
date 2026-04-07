# syntax=docker/dockerfile:1

FROM golang:1.25 AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y git ca-certificates

COPY go.mod go.sum ./

RUN go mod download

COPY backend ./backend

RUN CGO_ENABLED=0 GOOS=linux go build -o server ./backend

FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app
COPY --from=builder /app/server .

EXPOSE 8080
ENTRYPOINT ["./server"]