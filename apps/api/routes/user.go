package routes

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/handlers"
	"github.com/gofiber/fiber/v2"
)

func RegisterUserRoutes(app *fiber.App, client *ent.Client) {
	app.Post("/users", handlers.CreateUser(client))
}
