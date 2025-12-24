FROM golang:1.25.5-alpine AS builder

WORKDIR /app

RUN go install github.com/swaggo/swag/cmd/swag@v1.16.6

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN swag init

RUN CGO_ENABLED=0 GOOS=linux go build -o /api .

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /api .

EXPOSE 4000

CMD ["./api"]
