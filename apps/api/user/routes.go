package user

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/gofiber/fiber/v2"
)

func RegisterUserRoutes(app *fiber.App, client *ent.Client) {
	app.Post("/users", CreateUser(client))
}
