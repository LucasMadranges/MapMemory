package config

import (
	"log"
	"os"
)

func LoadJWT() string {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatal("JWT_SECRET is not set")
	}
	return secret
}
