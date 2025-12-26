package user

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/gofiber/fiber/v2"
)

func RegisterUserRoutes(app *fiber.App, client *ent.Client) {
	app.Get("/users", GetUsers(client))
	app.Post("/users", CreateUser(client))
	app.Delete("/users/:email", DeleteUsersByEmail(client))
}
