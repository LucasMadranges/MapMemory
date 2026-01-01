package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func RequireRole(allowed ...string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		token := c.Locals("user").(*jwt.Token)
		claims := token.Claims.(jwt.MapClaims)

		role, ok := claims["role"].(string)
		if !ok {
			return c.SendStatus(fiber.StatusForbidden)
		}

		for _, a := range allowed {
			if role == a {
				return c.Next()
			}
		}

		return c.SendStatus(fiber.StatusForbidden)
	}
}
