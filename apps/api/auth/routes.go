package auth

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/gofiber/fiber/v2"
)

func RegisterAuthRoutes(app *fiber.App, client *ent.Client) {
	app.Post("/auth/login", Login(client))
}
