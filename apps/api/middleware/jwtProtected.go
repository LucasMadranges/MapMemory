package middleware

import (
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/jwt/v3"
)

func JWTProtected() fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey: config.JWTSecret,
	})
}
